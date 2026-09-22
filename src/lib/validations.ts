import { z } from 'zod';
import type { FormType } from '@/types/enquiry';

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

export const submissionSchema = z.object({
  formType: z.enum(['contact', 'enquiry', 'exhibitor', 'visitor', 'sponsor']),
  platform: optionalText(100),
  registerAs: z.string().trim().min(2, 'Please select registration type.').max(100),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  name: z.string().trim().min(2, 'Full name is required.').max(120),
  designation: optionalText(120),
  email: z.string().trim().email('Please enter a valid email address.').max(180),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(40),
  website: optionalText(300),
  address: optionalText(500),
  country: z.string().trim().min(2, 'Country is required.').max(100),
  boothSizeRequirement: optionalText(100),
  areaOfInterest: optionalText(300),
  infoGetFrom: optionalText(200),
  message: optionalText(3000),
  event: optionalText(180),
  source: optionalText(300)
}).superRefine((data, ctx) => {
  // Dynamic validation based on registration type
  if (data.registerAs === 'Exhibitor' && (!data.company || data.company.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Company name is required for Exhibitors.',
      path: ['company'],
    });
  }
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const formTypeLabels: Record<FormType, string> = {
  contact: 'Contact',
  enquiry: 'General enquiry',
  exhibitor: 'Exhibitor enquiry',
  visitor: 'Visitor enquiry',
  sponsor: 'Sponsor / partner enquiry'
};