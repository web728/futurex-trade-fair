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

  const formLabel = payload.registerAs || formTypeLabels[payload.formType] || 'Enquiry';
  const companyInfo = payload.company ? `from ${payload.company}` : '(Visitor/Individual)';
  
  // High-visibility subject line for admin inbox
  const emailSubject = `[Futurex Lead] [${formLabel.toUpperCase()}] — ${payload.name} ${companyInfo} (${payload.country || 'Global'})`;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 28px; color: #0A0D12; max-width: 650px; margin: auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
      <div style="border-bottom: 2px solid #dc2626; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 10px; font-family: monospace; font-weight: 700; letter-spacing: 0.15em; background-color: #fef2f2; color: #dc2626; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
            NEW ${payload.formType.toUpperCase()} LEAD — ${payload.registerAs.toUpperCase()}
          </span>
          <h2 style="color: #0A0D12; margin: 8px 0 0 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
            ${formLabel} Submission
          </h2>
        </div>
        <div style="text-align: right; font-size: 11px; color: #6b7280; font-family: monospace;">
          Platform: <strong>${payload.platform || 'Website'}</strong>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 35%;">Registration Type</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #dc2626;">${payload.registerAs}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Company Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;">${payload.company || 'N/A (Visitor)'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Full Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Designation</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;">${payload.designation || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Work Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #dc2626;"><a href="mailto:${payload.email}" style="color: #dc2626; text-decoration: none;">${payload.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Mobile Number</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;"><a href="tel:${payload.phone}" style="color: #0A0D12; text-decoration: none;">${payload.phone || 'N/A'}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Website URL</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;"><a href="${payload.website || '#'}" target="_blank" style="color: #2563eb; text-decoration: none;">${payload.website || 'N/A'}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Country / Address</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;">${payload.address ? `${payload.address}, ` : ''}${payload.country || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Booth Size Req.</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;">${payload.boothSizeRequirement || 'N/A (Visitor)'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Area of Interest / Event</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;">${payload.areaOfInterest || payload.event || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Info. Get From</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;">${payload.infoGetFrom || 'N/A'}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; background-color: #f8fafc; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Message / Requirements:</p>
        <p style="margin: 0; font-size: 13.5px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${payload.message || 'No additional message provided.'}</p>
      </div>

      <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 11px; color: #9ca3af; font-family: monospace;">
        <span>Source: Futurex Trade System</span>
        <span>${submittedAt.toLocaleString()}</span>
      </div>
    </div>
  `;

  // Send ONLY to admin emails. The user filling the form receives no automated email.
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