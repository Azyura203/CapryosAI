# Capryos AI - University Assistant

An intelligent AI-powered chatbot for university information and consultation booking.

## Features

- 🤖 AI-powered chat interface for university information
- 🏫 Support for multiple universities (Auston Singapore, Auston Myanmar, LJMU)
- 🌍 Multi-language support (English, Myanmar, Chinese)
- 📅 Consultation booking system
- 🎨 Beautiful, responsive UI with animations
- 🔊 Text-to-speech functionality

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env`
   - Fill in your API keys and configuration

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Optional: Start the backend server (for consultation booking):**
   ```bash
   cd backend
   npm install
   node server.js
   ```

## Environment Variables

### Frontend (.env)
- `VITE_OPENAI_API_KEY` - Your OpenAI API key for AI responses
- `VITE_GOOGLE_SHEETS_API_KEY` - Google Sheets API key (optional)
- `VITE_GOOGLE_SHEETS_SPREADSHEET_ID` - Spreadsheet ID for consultations
- `VITE_BACKEND_URL` - Backend server URL

### Backend
- `CLIENT_ID` - Google OAuth client ID
- `CLIENT_SECRET` - Google OAuth client secret
- `REFRESH_TOKEN` - Google OAuth refresh token
- `PORT` - Server port (default: 3001)

## Development Mode

The application works in development mode without API keys:
- AI responses use fallback demo responses
- Consultation booking shows success messages without actual submission
- All UI features are fully functional

## Production Setup

For production deployment:
1. Set up OpenAI API key for real AI responses
2. Configure Google Sheets API for consultation booking
3. Set up backend server with proper OAuth credentials
4. Update environment variables accordingly

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **AI:** OpenAI GPT-4 API
- **Backend:** Node.js, Express
- **Database:** Google Sheets (for consultations)
- **Internationalization:** i18next
- **Icons:** Lucide React

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API services
├── data/              # Static data and configurations
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── i18n/              # Internationalization files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.