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

    // 26-column row mapping, exactly matching the sheet headers (A:Z)
    const rowValues = [
      submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), // 1.  Date & Time
      payload.platform || 'Website',                                      // 2.  Platform
      payload.registerAs || formTypeLabels[payload.formType] || 'Enquiry', // 3. Register As
      payload.company || '',                                              // 4.  Company Name
      payload.name || '',                                                 // 5.  Contact Person
      payload.designation || '',                                          // 6.  Designation
      payload.email || '',                                                // 7.  Email Id
      payload.phone || '',                                                // 8.  Mobile No.
      payload.website || '',                                              // 9.  Website
      payload.event || '',                                                // 10. Exhibition  <-- NEW
      payload.address || '',                                              // 11. Address
      payload.country || '',                                              // 12. Country
      payload.boothSizeRequirement || '',                                 // 13. Booth Size Requirement
      payload.areaOfInterest || '',                                       // 14. Area of Interest
      payload.infoGetFrom || '',                                          // 15. Info. Get From
      payload.message || '',                                              // 16. Message
      '',                                                                 // 17. Correction
      '', '', '', '', '', '', '', '', ''                                  // 18-26. STATUS 1 to 9
    ];

    const rangeName = `'${tab}'!A:Z`;

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