import 'server-only';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { FormType, SubmissionPayload } from '@/types/enquiry';
import { ContactSubmission } from '@/models/ContactSubmission';
import { Enquiry } from '@/models/Enquiry';
import { ExhibitorEnquiry } from '@/models/ExhibitorEnquiry';
import { VisitorEnquiry } from '@/models/VisitorEnquiry';
import { SponsorEnquiry } from '@/models/SponsorEnquiry';
import { connectToMongoDB } from './mongodb';
import { appendToGoogleSheet } from './google-sheets';
import { sendNotificationEmail } from './email';
import { isRateLimited } from './rate-limit';
import { logger } from './logger';
import { sanitizeText } from './utils';
import { submissionSchema } from './validations';

const models = {
  contact: ContactSubmission,
  enquiry: Enquiry,
  exhibitor: ExhibitorEnquiry,
  visitor: VisitorEnquiry,
  sponsor: SponsorEnquiry
};

const getIp = (request: NextRequest) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

export async function handleFormRequest(request: NextRequest, formType: FormType) {
  const ip = getIp(request);
  if (isRateLimited(`${formType}:${ip}`)) {
    return NextResponse.json({ success: false, message: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  // Extract recaptchaToken from request body
  const { recaptchaToken, ...rawBody } = body as Record<string, unknown> & { recaptchaToken?: string };

  // Verify reCAPTCHA token with Google
  if (!recaptchaToken) {
    return NextResponse.json({ success: false, message: 'Please complete the reCAPTCHA verification.' }, { status: 400 });
  }

  try {
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    });
    const verifyData = await verifyRes.json() as { success: boolean };
    if (!verifyData.success) {
      logger.error('reCAPTCHA validation failed', { formType, ip });
      return NextResponse.json({ success: false, message: 'Robot verification failed. Please try again.' }, { status: 400 });
    }
  } catch (error) {
    logger.error('reCAPTCHA verification network error', { error: error instanceof Error ? error.message : 'Unknown' });
    return NextResponse.json({ success: false, message: 'Could not verify reCAPTCHA. Please try again.' }, { status: 500 });
  }

  const parsed = submissionSchema.safeParse({ ...rawBody, formType });
  if (!parsed.success) {
    return NextResponse.json({
      success: false,
      message: 'Please review the form fields and try again.',
      fieldErrors: parsed.error.flatten().fieldErrors
    }, { status: 422 });
  }

  // Check honeypot field (honeypotWebsite)
  if (rawBody.honeypotWebsite) {
    logger.info('Spam honeypot triggered', { formType, ip });
    return NextResponse.json({ success: true, message: 'Thank you. Your enquiry has been received.' }, { status: 201 });
  }

  const payload: SubmissionPayload = {
    formType,
    platform: sanitizeText(parsed.data.platform || 'Website'),
    registerAs: sanitizeText(parsed.data.registerAs),
    company: sanitizeText(parsed.data.company),
    name: sanitizeText(parsed.data.name),
    designation: sanitizeText(parsed.data.designation),
    email: parsed.data.email.toLowerCase(),
    phone: sanitizeText(parsed.data.phone),
    website: sanitizeText(parsed.data.website),
    address: sanitizeText(parsed.data.address),
    country: sanitizeText(parsed.data.country),
    boothSizeRequirement: sanitizeText(parsed.data.boothSizeRequirement),
    areaOfInterest: sanitizeText(parsed.data.areaOfInterest),
    infoGetFrom: sanitizeText(parsed.data.infoGetFrom),
    message: sanitizeText(parsed.data.message),
    event: sanitizeText(parsed.data.event),
    source: sanitizeText(parsed.data.source || request.headers.get('referer') || '')
  };

  const submittedAt = new Date();
  let document: {
    _id: unknown;
    integrations: { googleSheets: 'pending' | 'success' | 'failed'; email: 'pending' | 'success' | 'failed' };
    save: () => Promise<unknown>;
  };

  try {
    await connectToMongoDB();
    document = await models[formType].create({
      ...payload,
      overallStatus: 'new',
      status1: '',
      status2: '',
      status3: '',
      status4: '',
      status5: '',
      status6: '',
      status7: '',
      status8: '',
      status9: '',
      integrations: { googleSheets: 'pending', email: 'pending' }
    }) as unknown as typeof document;
  } catch (error) {
    logger.error('MongoDB form persistence failed', { formType, ip, error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ success: false, message: 'We could not save your enquiry right now. Please try again shortly.' }, { status: 503 });
  }

  const results = await Promise.allSettled([
    appendToGoogleSheet(payload, submittedAt),
    sendNotificationEmail(payload, submittedAt)
  ]);

  const sheetStatus = results[0].status === 'fulfilled' ? 'success' : 'failed';
  const emailStatus = results[1].status === 'fulfilled' ? 'success' : 'failed';

  if (sheetStatus === 'failed') logger.error('Google Sheets append failed', { formType, submissionId: String(document._id) });
  if (emailStatus === 'failed') logger.error('Notification email failed', { formType, submissionId: String(document._id) });

  try {
    document.integrations = { googleSheets: sheetStatus, email: emailStatus };
    await document.save();
  } catch (error) {
    logger.error('Submission integration status update failed', { formType, submissionId: String(document._id), error: error instanceof Error ? error.message : 'Unknown error' });
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you. Your enquiry has been received successfully. Our team will get back to you shortly.'
  }, { status: 201 });
}