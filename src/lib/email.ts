import 'server-only';
import nodemailer from 'nodemailer';
import type { SubmissionPayload } from '@/types/enquiry';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNotificationEmail(payload: SubmissionPayload, submittedAt: Date) {
  const adminEmails = [
    process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@futurex.in',
    process.env.SECONDARY_NOTIFICATION_EMAIL || 'leads@futurex.in'
  ];

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; color: #111; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 12px;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #fee2e2; padding-bottom: 10px;">New ${payload.formType.toUpperCase()} Enquiry</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${payload.company || 'N/A'}</p>
      <p><strong>Country:</strong> ${payload.country || 'N/A'}</p>
      <p><strong>Event:</strong> ${payload.event || 'N/A'}</p>
      <p><strong>Subject:</strong> ${payload.subject || 'N/A'}</p>
      <p><strong>Message:</strong><br/>${payload.message || 'N/A'}</p>
      <hr style="border: none; border-top: 1px solid #eaeayu; margin: 20px 0;" />
      <p style="font-size: 11px; color: #666;">Submitted at: ${submittedAt.toLocaleString()}</p>
    </div>
  `;

  // Send to multiple admin emails simultaneously
  await Promise.all(
    adminEmails.map(email =>
      transporter.sendMail({
        from: `"Futurex System" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `[New Lead] ${payload.name} — ${payload.subject || 'Exhibition Enquiry'}`,
        html: htmlContent,
      })
    )
  );
}