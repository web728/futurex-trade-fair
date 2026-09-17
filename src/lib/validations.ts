import { z } from 'zod';
import type { FormType } from '@/types/enquiry';

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

export const submissionSchema = z.object({
  formType: z.enum(['contact', 'enquiry', 'exhibitor', 'visitor', 'sponsor']),
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(180),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(40),
  company: z.string().trim().min(2, 'Company name is required.').max(160), // Mandatory
  country: z.string().trim().min(2, 'Country is required.').max(100),       // Mandatory
  event: optionalText(180),
  subject: optionalText(180),
  message: optionalText(3000),
  source: optionalText(300),
  website: optionalText(300)
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const formTypeLabels: Record<FormType, string> = {
  contact: 'Contact',
  enquiry: 'General enquiry',
  exhibitor: 'Exhibitor enquiry',
  visitor: 'Visitor enquiry',
  sponsor: 'Sponsor / partner enquiry'
};