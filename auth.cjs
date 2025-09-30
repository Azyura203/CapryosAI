const { google } = require('googleapis');
const credentials = require('./credentials.json'); // Import JSON file

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Replace with the authorization code you received
const code = '4/0AanRRrvUJsD1Jnvk77RZrD-P9eM0U5F1JTi6tjVSftsemg93N5ED6H7e1pawtAgNy9slmQ';

// Exchange the authorization code for tokens
oauth2Client.getToken(code, (err, token) => {
  if (err) return console.error('Error retrieving access token:', err);

  // Set the credentials (access token and refresh token)
  oauth2Client.setCredentials(token);

  // Log the tokens (for debugging purposes)
  console.log('Access Token:', token.access_token);
  console.log('Refresh Token:', token.refresh_token);

  // Now you can use the authenticated client to make API requests
  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

  // Example: Append data to a sheet
  sheets.spreadsheets.values.append({
    spreadsheetId: '1QXV10ANCaE-A2ZXDRDGfb4BLUSCt0ppUeojAwvJcRlg',
    range: 'Consultations!A:G',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['John Doe', 'john.doe@example.com', '1234567890', '2023-10-15', '14:00', 'Program Information', 'Hello!']],
    },
  }, (err, res) => {
    if (err) return console.error('Error appending data:', err);
    console.log('Data appended:', res.data);
  });
});