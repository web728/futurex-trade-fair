'use client';

import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { AnimatePresence, motion } from 'framer-motion';
import type { FormType } from '@/types/enquiry';
import { EXHIBITIONS } from '@/data/exhibitions';
import { submissionSchema } from '@/lib/validations';
import { FormField } from './FormField';
import { SubmitButton } from './SubmitButton';
import Image from 'next/image';

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
    platform: 'Website',
    registerAs: 'Exhibitor',
    company: '',
    name: '', // Full Name
    designation: '',
    email: '', 
    phone: '', 
    website: '',
    address: '',
    country: '',
    boothSizeRequirement: '',
    areaOfInterest: '',
    infoGetFrom: '',
    message: '',
    event: defaultEvent || '',
    honeypotWebsite: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isVisitor = formData.registerAs === 'Trade Visitor';
  const isExhibitorOrSponsor = ['Exhibitor', 'Sponsor'].includes(formData.registerAs);

  const validateStep = (step: number): boolean => {
    const newErrors: FieldErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim() || formData.phone.length < 7) newErrors.phone = 'Valid phone number is required';
      if (isExhibitorOrSponsor && !formData.company.trim()) {
        newErrors.company = 'Company name is required for exhibitors/sponsors';
      }
    } else if (step === 2) {
      if (!formData.country.trim()) newErrors.country = 'Country is required';
      if (!formData.registerAs.trim()) newErrors.registerAs = 'Please select registration type';
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

    const parsed = submissionSchema.safeParse({ 
      ...formData, 
      website: formData.website, 
      formType, 
      source: window.location.href 
    });

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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-neutral-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] select-none relative overflow-hidden">
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full mb-3">
          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
            <Image
              src="/logos/svg/logo-arrow.png"
              alt="Icon"
              fill
              className="object-contain"
            />
          </div>
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
          <label>Website<input name="honeypotWebsite" value={formData.honeypotWebsite} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label>
        </div>

        {/* STEP 1: Core Personal & Organization Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <FormField 
              label="Participation / Registration Type" 
              name="registerAs" 
              as="select" 
              options={[
                { value: 'Exhibitor', label: 'Exhibitor (Book a Stall / Space)' },
                { value: 'Trade Visitor', label: 'Trade Visitor (Business Pass)' },
                { value: 'Sponsor', label: 'Sponsor & Partner' },
                { value: 'Speaker', label: 'Conference Speaker / Delegate' },
                { value: 'General Enquiry', label: 'General Enquiry' }
              ]} 
              selectProps={{ value: formData.registerAs, onChange: handleChange }} 
            />

            <FormField label="Full Name" name="name" required error={errors.name} inputProps={{ value: formData.name, onChange: handleChange, autoComplete: 'name', maxLength: 120, placeholder: 'e.g. John Doe' }} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Work Email" name="email" required error={errors.email} inputProps={{ type: 'email', value: formData.email, onChange: handleChange, autoComplete: 'email', maxLength: 180, placeholder: 'john@company.com' }} />
              <FormField label="Mobile Number" name="phone" required error={errors.phone} inputProps={{ type: 'tel', value: formData.phone, onChange: handleChange, autoComplete: 'tel', maxLength: 40, placeholder: '+91 98765 43210' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Job Designation" name="designation" error={errors.designation} inputProps={{ value: formData.designation, onChange: handleChange, maxLength: 120, placeholder: 'e.g. Marketing Director' }} />
              <FormField 
                label="Company Name" 
                name="company" 
                required={isExhibitorOrSponsor} 
                error={errors.company} 
                inputProps={{ value: formData.company, onChange: handleChange, autoComplete: 'organization', maxLength: 160, placeholder: 'Company Pvt Ltd' }} 
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button type="button" onClick={nextStep} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A0D12] text-white rounded-full text-xs font-mono tracking-wider uppercase hover:bg-neutral-800 transition-all cursor-pointer shadow-md">
                <span>Next Step</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Location & Dynamic Requirements */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Country" name="country" required error={errors.country} inputProps={{ value: formData.country, onChange: handleChange, autoComplete: 'country-name', maxLength: 100, placeholder: 'India' }} />
              <FormField label="Website URL" name="website" error={errors.website} inputProps={{ type: 'url', value: formData.website, onChange: handleChange, maxLength: 300, placeholder: 'https://company.com' }} />
            </div>

            <FormField label="Office / Residential Address" name="address" error={errors.address} inputProps={{ value: formData.address, onChange: handleChange, maxLength: 500, placeholder: 'Street address, City, State' }} />

            {/* Dynamic fields: Booth size shown for Exhibitors/Sponsors, Area of Interest shown for everyone cleanly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60">
              {!isVisitor && (
                <FormField label="Booth Size Requirement" name="boothSizeRequirement" error={errors.boothSizeRequirement} inputProps={{ value: formData.boothSizeRequirement, onChange: handleChange, placeholder: 'e.g. 3x3m, 6x4m' }} />
              )}
              <div className={isVisitor ? "sm:col-span-2" : ""}>
                <FormField label="Area of Interest / Product Category" name="areaOfInterest" error={errors.areaOfInterest} inputProps={{ value: formData.areaOfInterest, onChange: handleChange, placeholder: 'e.g. Machinery, Packaging' }} />
              </div>
            </div>

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

        {/* STEP 3: Message & reCAPTCHA Verification */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <FormField 
              label="How did you hear about us?" 
              name="infoGetFrom" 
              error={errors.infoGetFrom} 
              as="select" 
              options={[
                { value: 'Social Media', label: 'Social Media' },
                { value: 'Email Campaign', label: 'Email Campaign' },
                { value: 'Google Search', label: 'Google Search' },
                { value: 'Industry Reference', label: 'Industry Reference' },
                { value: 'Other', label: 'Other' }
              ]}
              selectProps={{ value: formData.infoGetFrom, onChange: handleChange }}
            />

            <FormField label="Message / Specific Requirements" name="message" error={errors.message} as="textarea" textareaProps={{ value: formData.message, onChange: handleChange, rows: 4, maxLength: 3000, placeholder: 'Please describe any extra requirements or comments...' }} />

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

      {/* Premium Success Popup Modal */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-100 text-center relative"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <CheckCircle2 size={36} className="stroke-[2.5]" />
              </div>

              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                SUCCESSFULLY SENT
              </span>

              <h3 className="text-2xl font-semibold tracking-tight text-[#0A0D12] mt-3 mb-2">
                Thank You!
              </h3>

              <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-6">
                {message}
              </p>

              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    platform: 'Website',
                    registerAs: 'Exhibitor',
                    company: '',
                    name: '',
                    designation: '',
                    email: '',
                    phone: '',
                    website: '',
                    address: '',
                    country: '',
                    boothSizeRequirement: '',
                    areaOfInterest: '',
                    infoGetFrom: '',
                    message: '',
                    event: defaultEvent || '',
                    honeypotWebsite: ''
                  });
                  setCurrentStep(1);
                  setRecaptchaToken(null);
                }}
                className="w-full py-3.5 bg-[#0A0D12] hover:bg-neutral-800 text-white rounded-full text-xs font-mono tracking-wider uppercase transition-all shadow-md cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PremiumForm;