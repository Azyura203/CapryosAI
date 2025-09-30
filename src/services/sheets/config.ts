export const GOOGLE_SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID,
  range: import.meta.env.VITE_GOOGLE_SHEETS_RANGE || 'Consultations!A1:Z',
};