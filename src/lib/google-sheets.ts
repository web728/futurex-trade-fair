import 'server-only';
import { google } from 'googleapis';
import type { SubmissionPayload } from '@/types/enquiry';
import { formTypeLabels } from './validations';

const getTabName = (formType: SubmissionPayload['formType']) => {
  const names: Record<SubmissionPayload['formType'], string | undefined> = {
    contact: process.env.GOOGLE_SHEET_TAB_CONTACT,
    enquiry: process.env.GOOGLE_SHEET_TAB_ENQUIRY,
    exhibitor: process.env.GOOGLE_SHEET_TAB_EXHIBITOR,
    visitor: process.env.GOOGLE_SHEET_TAB_VISITOR,
    sponsor: process.env.GOOGLE_SHEET_TAB_SPONSOR
  };
  return names[formType] || 'Website Enquiries';
};

export async function appendToGoogleSheet(payload: SubmissionPayload, submittedAt: Date) {
  const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!base64Key || !spreadsheetId) {
    throw new Error('Google Sheets environment variables are incomplete.');
  }

  try {
    const credentialsJson = JSON.parse(
      Buffer.from(base64Key, 'base64').toString('utf8')
    );

    const auth = new google.auth.JWT({
      email: credentialsJson.client_email,
      key: credentialsJson.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const tab = getTabName(payload.formType);

    // Aapki sheet ke 25 columns ke exact order ke mutabiq mapping
    const rowValues = [
      submittedAt.toLocaleString(),                // 1. Date & Time
      payload.source || 'Website',                 // 2. Platform
      formTypeLabels[payload.formType] || 'Enquiry', // 3. Register As
      payload.company || '',                       // 4. Company Name
      payload.name || '',                          // 5. Contact Person
      '',                                          // 6. Designation
      payload.email || '',                         // 7. Email Id
      payload.phone || '',                         // 8. Mobile No.
      '',                                          // 9. Website
      '',                                          // 10. Address
      payload.country || '',                       // 11. Country
      '',                                          // 12. Booth Size Requirement
      payload.event || payload.subject || '',      // 13. Area of Interest
      payload.source || '',                        // 14. Info. Get From
      payload.message || '',                       // 15. Message
      '',                                          // 16. Correction
      '', '', '', '', '', '', '', '', ''           // 17-25. STATUS 1 to 9 (Blank)
    ];

    const rangeName = `'${tab}'!A:Y`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: rangeName,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues]
      }
    });
  } catch (error: any) {
    console.error('Google Sheets API Error Details:', error?.response?.data || error.message || error);
    throw error;
  }
}