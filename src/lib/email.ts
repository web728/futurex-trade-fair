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

// User input ko HTML me daalne se pehle escape karna zaroori hai (HTML injection se bachne ke liye)
const esc = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const safeUrl = (value?: string): string | null => {
  if (!value) return null;
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : null;
};

export async function sendNotificationEmail(payload: SubmissionPayload, submittedAt: Date) {
  const adminEmails = [
    process.env.NOTIFICATION_EMAIL_1 || 'admin@futurextrade.com',
    process.env.NOTIFICATION_EMAIL_2 || 'web@futurexpr.com'
  ].filter(Boolean);

  const formLabel = payload.registerAs || formTypeLabels[payload.formType] || 'Enquiry';
  const companyInfo = payload.company ? `from ${payload.company}` : '(Visitor/Individual)';
  const eventInSubject = payload.event ? ` | ${payload.event}` : '';

  // High-visibility subject line for admin inbox
  const emailSubject = `[Futurex Lead] [${formLabel.toUpperCase()}] — ${payload.name} ${companyInfo} (${payload.country || 'Global'})${eventInSubject}`;

  const submittedAtStr = submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const websiteUrl = safeUrl(payload.website);

  const labelStyle = 'padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 35%;';
  const valueStyle = 'padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0A0D12;';
  const accentStyle = 'padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #dc2626;';

  const row = (label: string, valueHtml: string, style = valueStyle) => `
        <tr>
          <td style="${labelStyle}">${label}</td>
          <td style="${style}">${valueHtml}</td>
        </tr>`;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 28px; color: #0A0D12; max-width: 650px; margin: auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
      <div style="border-bottom: 2px solid #dc2626; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-size: 10px; font-family: monospace; font-weight: 700; letter-spacing: 0.15em; background-color: #fef2f2; color: #dc2626; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
          NEW ${esc(payload.formType.toUpperCase())} LEAD — ${esc(payload.registerAs.toUpperCase())}
        </span>
        <h2 style="color: #0A0D12; margin: 8px 0 0 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
          ${esc(formLabel)} Submission
        </h2>
        <div style="margin-top: 6px; font-size: 11px; color: #6b7280; font-family: monospace;">
          Platform: <strong>${esc(payload.platform || 'Website')}</strong>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
        ${row('Date &amp; Time', esc(submittedAtStr))}
        ${row('Registration Type', esc(payload.registerAs), accentStyle)}
        ${row('Exhibition / Event', esc(payload.event || 'Not selected'), accentStyle)}
        ${row('Company Name', esc(payload.company || 'N/A'))}
        ${row('Full Name', esc(payload.name))}
        ${row('Designation', esc(payload.designation || 'N/A'))}
        ${row('Work Email', `<a href="mailto:${esc(payload.email)}" style="color: #dc2626; text-decoration: none;">${esc(payload.email)}</a>`, accentStyle)}
        ${row('Mobile Number', payload.phone ? `<a href="tel:${esc(payload.phone)}" style="color: #0A0D12; text-decoration: none;">${esc(payload.phone)}</a>` : 'N/A')}
        ${row('Website URL', websiteUrl ? `<a href="${esc(websiteUrl)}" target="_blank" style="color: #2563eb; text-decoration: none;">${esc(websiteUrl)}</a>` : esc(payload.website || 'N/A'))}
        ${row('Address', esc(payload.address || 'N/A'))}
        ${row('Country', esc(payload.country || 'N/A'))}
        ${row('Booth Size Req.', esc(payload.boothSizeRequirement || 'N/A'))}
        ${row('Area of Interest', esc(payload.areaOfInterest || 'N/A'))}
        ${row('Info. Get From', esc(payload.infoGetFrom || 'N/A'))}
        ${row('Form Page', esc(payload.source || 'N/A'))}
      </table>

      <div style="margin-top: 24px; background-color: #f8fafc; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Message / Requirements:</p>
        <p style="margin: 0; font-size: 13.5px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${esc(payload.message || 'No additional message provided.')}</p>
      </div>

      <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; font-family: monospace;">
        Source: Futurex Trade System &nbsp;|&nbsp; ${esc(submittedAtStr)}
      </div>
    </div>
  `;

  // Send ONLY to admin emails. The user filling the form receives no automated email.
  await Promise.all(
    adminEmails.map(email =>
      transporter.sendMail({
        from: `"Futurex System" <${process.env.SMTP_USER}>`,
        to: email,
        replyTo: payload.email,
        subject: emailSubject,
        html: htmlContent,
      })
    )
  );
}