# WhatsApp AI Assistant

A WhatsApp AI assistant built with Node.js, Twilio, and Google Gemini API.

## Features

- Receives WhatsApp messages via Twilio webhook
- Processes messages using Google Gemini AI
- Sends intelligent responses back to users
- Error handling and logging
- Health check endpoint

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

\`\`\`bash
cp .env.example .env
\`\`\`

Fill in your credentials:
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
- `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google AI API Key

### 3. Twilio Configuration

1. Go to your Twilio Console
2. Navigate to WhatsApp Sandbox or your approved WhatsApp number
3. Set the webhook URL to: `https://your-domain.com/webhook`
4. Set HTTP method to POST

### 4. Run the Application

Development mode:
\`\`\`bash
npm run dev
\`\`\`

Production mode:
\`\`\`bash
npm start
\`\`\`

### 5. Testing

Send a WhatsApp message to your Twilio number and the AI assistant will respond!

## API Endpoints

- `POST /webhook` - Receives WhatsApp messages from Twilio
- `GET /health` - Health check endpoint

## How It Works

1. User sends WhatsApp message
2. Twilio forwards message to webhook endpoint
3. Server processes message with Google Gemini AI
4. AI response is sent back to user via Twilio WhatsApp API

## Deployment

For production deployment, consider using:
- Heroku, Vercel, or Railway for hosting
- ngrok for local development tunneling
- Environment variable management for secrets
# twillo-wa-bot
# twillo-bot
# twillo-bot
# twillo-bot
# twillo-bot
