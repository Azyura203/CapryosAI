const express = require('express');
const cors = require('cors'); // Import the cors middleware
const { google } = require('googleapis');
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
}));

// Parse JSON request bodies
app.use(express.json());

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Set credentials with the refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// Initialize Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

// Handle preflight requests
app.options('/api/submit-consultation', cors());

// Submit consultation endpoint
app.post('/api/submit-consultation', async (req, res) => {
  const formData = req.body;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.RANGE,
      valueInputOption: 'RAW',
      resource: {
        values: [Object.values(formData)],
      },
    });

    res.status(200).json({ message: 'Consultation booked successfully!' });
  } catch (error) {
    console.error('Error submitting consultation:', error);
    res.status(500).json({ error: 'Failed to book consultation' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});