'use client';

import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
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
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    event: defaultEvent || '',
    subject: '',
    message: '',
    website: '' // honeypot
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FieldErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim() || formData.phone.length < 7) newErrors.phone = 'Valid phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus('idle');

    if (!recaptchaToken) {
      setStatus('error');
      setMessage('Please verify that you are not a robot.');
      return;
    }

    const parsed = submissionSchema.safeParse({ ...formData, formType, source: window.location.href });

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
        body: JSON.stringify({ ...parsed.data, recaptchaToken })
      });
      const result = await response.json() as { success?: boolean; message?: string; fieldErrors?: Record<string, string[]> };
      if (!response.ok || !result.success) {
        if (result.fieldErrors) setErrors(firstErrors(result.fieldErrors));
        throw new Error(result.message || 'We could not send your enquiry.');
      }
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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-neutral-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] select-none">
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full mb-3">
          <Sparkles className="w-3 h-3 text-red-600" />
          <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-red-600">
            {formType.toUpperCase()} ENQUIRY — STEP {currentStep} OF 3
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-[-0.035em] text-[#0A0D12] leading-tight mb-2">
          {title}
        </h2>
        <p className="text-neutral-500 text-xs sm:text-sm leading-[1.7]">
          {intro}
        </p>
      </div>

      <div className="w-full bg-neutral-100 h-1.5 rounded-full mb-6 sm:mb-8 overflow-hidden">
        <div 
          className="bg-red-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4 sm:space-y-5">
        <div className="hidden" aria-hidden="true">
          <label>Website<input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label>
        </div>

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <FormField label="Full Name" name="name" required error={errors.name} inputProps={{ value: formData.name, onChange: handleChange, autoComplete: 'name', maxLength: 120, placeholder: 'e.g. John Doe' }} />
            <FormField label="Business Email" name="email" required error={errors.email} inputProps={{ type: 'email', value: formData.email, onChange: handleChange, autoComplete: 'email', maxLength: 180, placeholder: 'john@company.com' }} />
            <FormField label="Phone Number" name="phone" required error={errors.phone} inputProps={{ type: 'tel', value: formData.phone, onChange: handleChange, autoComplete: 'tel', maxLength: 40, placeholder: '+91 98765 43210' }} />

            <div className="pt-3 flex justify-end">
              <button type="button" onClick={nextStep} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A0D12] text-white rounded-full text-xs font-mono tracking-wider uppercase hover:bg-neutral-800 transition-all cursor-pointer shadow-md">
                <span>Next Step</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <FormField label="Company Name" name="company" error={errors.company} inputProps={{ value: formData.company, onChange: handleChange, autoComplete: 'organization', maxLength: 160, placeholder: 'Company Pvt Ltd' }} />
            <FormField label="Country" name="country" error={errors.country} inputProps={{ value: formData.country, onChange: handleChange, autoComplete: 'country-name', maxLength: 100, placeholder: 'India' }} />
            
            {showEvent ? (
              <FormField label="Exhibition / Event" name="event" error={errors.event} as="select" options={EXHIBITIONS.map((item) => ({ value: item.name, label: `${item.name} — ${item.venue.city}` }))} selectProps={{ value: formData.event, onChange: handleChange }} />
            ) : null}

            <div className="pt-3 flex items-center justify-between gap-3">
              <button type="button" onClick={prevStep} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-100 text-neutral-800 rounded-full text-xs font-mono tracking-wider uppercase hover:bg-neutral-200 transition-all cursor-pointer">
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <button type="button" onClick={nextStep} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A0D12] text-white rounded-full text-xs font-mono tracking-wider uppercase hover:bg-neutral-800 transition-all cursor-pointer shadow-md">
                <span>Review Details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <FormField label="Subject" name="subject" error={errors.subject} inputProps={{ value: formData.subject, onChange: handleChange, maxLength: 180, placeholder: 'Exhibition Booth Enquiry / Sponsorship' }} />
            <FormField label="Message" name="message" error={errors.message} as="textarea" textareaProps={{ value: formData.message, onChange: handleChange, rows: 4, maxLength: 3000, placeholder: 'Please describe your query or requirement in detail...' }} />

            {/* reCAPTCHA v2 Responsive Container */}
            <div className="py-2 w-full overflow-x-auto flex justify-center">
              <div className="scale-[0.85] sm:scale-100 origin-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  onChange={(token) => setRecaptchaToken(token)}
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between gap-3">
              <button type="button" onClick={prevStep} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-100 text-neutral-800 rounded-full text-xs font-mono tracking-wider uppercase hover:bg-neutral-200 transition-all cursor-pointer">
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <div className="flex-1 sm:flex-none flex justify-end">
                <SubmitButton loading={loading} label={submitLabel || 'Send Enquiry'} />
              </div>
            </div>
          </div>
        )}

        <div className="pt-2" aria-live="polite">
          {status === 'success' && (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs sm:text-sm font-mono">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Thank you!</strong>
                <span>{message}</span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs sm:text-sm font-mono">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Unable to submit.</strong>
                <span>{message}</span>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default PremiumForm;