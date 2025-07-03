const twilio = require("twilio");
const { google } = require("@ai-sdk/google");
const { generateText } = require("ai");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const incomingMessage = req.body.Body;
      const fromNumber = req.body.From;

      console.log(`Received message: "${incomingMessage}" from ${fromNumber}`);

      // Generate response using Google Gemini
      const aiResponse = await generateAIResponse(incomingMessage);

      // Send response back via WhatsApp
      await sendWhatsAppMessage(fromNumber, aiResponse);

      res.status(200).send("Message processed successfully");
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).send("Error processing message");
    }
  } else if (req.method === "GET") {
    // Health check endpoint
    res
      .status(200)
      .json({ status: "OK", message: "WhatsApp AI Assistant is running" });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

// Function to generate AI response using Google Gemini
async function generateAIResponse(userMessage) {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt: `You are a helpful WhatsApp AI assistant. Respond to the following message in a friendly and concise way (keep responses under 1000 characters for WhatsApp): ${userMessage}`,
      maxTokens: 200,
    });
    return text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I encountered an error while processing your request. The Gemini API free limit has been exceeded. Please try again later or contact the administrator.";
  }
}

// Function to send WhatsApp message via Twilio
async function sendWhatsAppMessage(toNumber, message) {
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: toNumber,
      body: message,
    });
    console.log(`Message sent successfully. SID: ${response.sid}`);
    return response;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
}
