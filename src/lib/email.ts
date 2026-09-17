import 'server-only';
import nodemailer from 'nodemailer';
import type { SubmissionPayload } from '@/types/enquiry';
import { formTypeLabels } from './validations';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,  
  },
});

export async function sendNotificationEmail(payload: SubmissionPayload, submittedAt: Date) {
  const adminEmails = [
    process.env.NOTIFICATION_EMAIL_1 || 'admin@futurextrade.com',
    process.env.NOTIFICATION_EMAIL_2 || 'web@futurexpr.com'
  ].filter(Boolean);

  const formLabel = formTypeLabels[payload.formType] || 'Enquiry';
  const companyName = payload.company ? `from ${payload.company}` : '';
  
  // Professional, clean and readable subject line
  const emailSubject = `[Futurex Trade] ${formLabel} — ${payload.name} ${companyName}`;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
      <div style="border-bottom: 2px solid #dc2626; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <h2 style="color: #dc2626; margin: 0; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
          New ${formLabel} Received
        </h2>
        <span style="font-size: 11px; background-color: #fef2f2; color: #dc2626; padding: 4px 10px; border-radius: 20px; font-weight: 600; text-transform: uppercase;">
          ${payload.formType}
        </span>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 35%;">Contact Person</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Business Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;"><a href="mailto:${payload.email}" style="color: #dc2626; text-decoration: none;">${payload.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Mobile Number</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;"><a href="tel:${payload.phone}" style="color: #111827; text-decoration: none;">${payload.phone || 'N/A'}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Company Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${payload.company || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Country</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${payload.country || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Target Event</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${payload.event || 'General Exhibition'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Subject / Intent</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${payload.subject || 'N/A'}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; background-color: #f9fafb; padding: 15px; border-radius: 10px; border: 1px solid #e5e7eb;">
        <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase;">Message / Requirements:</p>
        <p style="margin: 0; font-size: 14px; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${payload.message || 'No additional message provided.'}</p>
      </div>

      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 11px; color: #9ca3af;">
        <span>Source Platform: Futurex Trade Portal</span>
        <span>${submittedAt.toLocaleString()}</span>
      </div>
    </div>
  `;

  await Promise.all(
    adminEmails.map(email =>
      transporter.sendMail({
        from: `"Futurex System" <${process.env.SMTP_USER}>`,
        to: email,
        subject: emailSubject,
        html: htmlContent,
      })
    )
  );
}