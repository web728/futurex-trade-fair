'use client';

import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { FormType } from '@/types/enquiry';
import { EXHIBITIONS } from '@/data/exhibitions';
import { submissionSchema } from '@/lib/validations';
import { FormField } from './FormField';
import { SubmitButton } from './SubmitButton';

interface PremiumFormProps {
  formType: FormType;
  endpoint: string;
  title: string;
  intro: string;
  submitLabel?: string;
  defaultEvent?: string;
  showEvent?: boolean;
}

type FieldErrors = Record<string, string | undefined>;

const firstErrors = (fieldErrors: Record<string, string[] | undefined>): FieldErrors =>
  Object.fromEntries(Object.entries(fieldErrors).map(([key, values]) => [key, values?.[0]]));

export function PremiumForm({ formType, endpoint, title, intro, submitLabel, defaultEvent = '', showEvent = true }: PremiumFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus('idle');
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = submissionSchema.safeParse({ ...raw, formType, source: window.location.href });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>;
      setErrors(firstErrors(fieldErrors));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      const result = await response.json() as { success?: boolean; message?: string; fieldErrors?: Record<string, string[]> };
      if (!response.ok || !result.success) {
        if (result.fieldErrors) setErrors(firstErrors(result.fieldErrors));
        throw new Error(result.message || 'We could not send your enquiry.');
      }
      form.reset();
      setStatus('success');
      setMessage(result.message || 'Thank you. Your enquiry has been received successfully.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl p-7 sm:p-10 border border-neutral-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] select-none">
      {/* Intro Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-200 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-red-600">
            {formType.toUpperCase()} ENQUIRY
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.035em] text-[#0A0D12] leading-tight mb-2">
          {title}
        </h2>
        <p className="text-neutral-500 text-xs sm:text-sm leading-[1.75]">
          {intro}
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="hidden" aria-hidden="true">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Full Name" name="name" required error={errors.name} inputProps={{ autoComplete: 'name', maxLength: 120, placeholder: 'e.g. John Doe' }} />
          <FormField label="Business Email" name="email" required error={errors.email} inputProps={{ type: 'email', autoComplete: 'email', maxLength: 180, placeholder: 'john@company.com' }} />
          <FormField label="Phone Number" name="phone" error={errors.phone} inputProps={{ type: 'tel', autoComplete: 'tel', maxLength: 40, placeholder: '+91 98765 43210' }} />
          <FormField label="Company Name" name="company" error={errors.company} inputProps={{ autoComplete: 'organization', maxLength: 160, placeholder: 'Company Pvt Ltd' }} />
          <FormField label="Country" name="country" error={errors.country} inputProps={{ autoComplete: 'country-name', maxLength: 100, placeholder: 'India' }} />
          
          {showEvent ? (
            <FormField 
              label="Exhibition / Event" 
              name="event" 
              error={errors.event} 
              as="select" 
              options={EXHIBITIONS.map((item) => ({ 
                value: item.name, 
                label: `${item.name} — ${item.venue.city}` 
              }))} 
              selectProps={{ defaultValue: defaultEvent }} 
            />
          ) : null}
        </div>

        <FormField label="Subject" name="subject" error={errors.subject} inputProps={{ maxLength: 180, placeholder: 'Exhibition Booth Enquiry / Sponsorship' }} />
        <FormField label="Message" name="message" error={errors.message} as="textarea" textareaProps={{ rows: 5, maxLength: 3000, placeholder: 'Please describe your query or requirement in detail...' }} />

        <div className="pt-2">
          <SubmitButton loading={loading} label={submitLabel || 'Send Enquiry'} />
        </div>

        <div className="pt-2" aria-live="polite">
          {status === 'success' ? (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs sm:text-sm font-mono">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Thank you!</strong>
                <span>{message}</span>
              </div>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs sm:text-sm font-mono">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Unable to submit.</strong>
                <span>{message}</span>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default PremiumForm;