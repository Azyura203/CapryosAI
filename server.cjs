console.log('Starting server...');

const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

console.log('Loading environment variables...');
dotenv.config();

console.log('Validating environment variables...');
const requiredEnvVars = [
  'CLIENT_ID',
  'CLIENT_SECRET',
  'REDIRECT_URI',
  'REFRESH_TOKEN',
  'VITE_GOOGLE_SHEETS_SPREADSHEET_ID',
  'VITE_GOOGLE_SHEETS_RANGE',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

console.log('Initializing Express app...');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || '*' }));
app.use(morgan('combined'));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

console.log('Initializing OAuth2 client...');
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

console.log('Setting credentials...');
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

console.log('Initializing Google Sheets API...');
const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

console.log('Defining appendToSheet function...');
async function appendToSheet(data) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID,
      range: process.env.VITE_GOOGLE_SHEETS_RANGE,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [data],
      },
    });

    console.log('Data appended:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error appending data:', error.message);
    if (error.response) {
      console.error('Google Sheets API response error:', error.response.data);
    }
    throw error;
  }
}

console.log('Defining /api/submit-consultation endpoint...');
app.post(
  '/api/submit-consultation',
  [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('phone').notEmpty().trim().withMessage('Phone number is required'),
    body('date').isISO8601().toDate().withMessage('Invalid date format (expected YYYY-MM-DD)'),
    body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid time format (expected HH:MM)'),
    body('topic').notEmpty().trim().withMessage('Topic is required'),
    body('message').notEmpty().trim().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formData = req.body;

    try {
      await appendToSheet([
        formData.name,
        formData.email,
        formData.phone,
        formData.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        formData.time,
        formData.topic,
        formData.message,
      ]);

      res.status(200).json({ message: 'Consultation booked successfully!' });
    } catch (error) {
      console.error('Error submitting consultation:', error);
      res.status(500).json({ error: 'Failed to book consultation' });
    }
  }
);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
  });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forcing shutdown...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);