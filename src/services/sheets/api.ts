import { GOOGLE_SHEETS_CONFIG } from './config';
import { SheetRow } from './types';

export async function appendToSheet(data: Omit<SheetRow, 'timestamp'>) {
  if (!GOOGLE_SHEETS_CONFIG.apiKey || !GOOGLE_SHEETS_CONFIG.spreadsheetId) {
    throw new Error('Google Sheets configuration is missing');
  }

  const row = {
    timestamp: new Date().toISOString(),
    ...data,
  };

  const values = [Object.values(row)];

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&key=${GOOGLE_SHEETS_CONFIG.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to append data to Google Sheet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}