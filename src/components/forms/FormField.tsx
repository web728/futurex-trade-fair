'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  as?: 'input' | 'select' | 'textarea';
  options?: Array<{ value: string; label: string }>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

export function FormField({
  label,
  name,
  required,
  error,
  as = 'input',
  options = [],
  inputProps,
  textareaProps,
  selectProps
}: FormFieldProps) {
  const baseControlClasses =
    "w-full px-4 py-3 bg-slate-50/80 border text-slate-900 text-sm rounded-xl transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#E3131B]/20 focus:border-[#E3131B] placeholder:text-slate-400";
  
  const borderClass = error ? "border-rose-300 bg-rose-50/30" : "border-slate-200 hover:border-slate-300";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700 flex items-center justify-between">
        <span>
          {label} {required && <span className="text-[#E3131B]">*</span>}
        </span>
      </label>

      {as === 'input' && (
        <input
          id={name}
          name={name}
          required={required}
          className={`${baseControlClasses} ${borderClass}`}
          {...inputProps}
        />
      )}

      {as === 'select' && (
        <select
          id={name}
          name={name}
          required={required}
          className={`${baseControlClasses} ${borderClass} appearance-none cursor-pointer`}
          {...selectProps}
        >
          <option value="">Select option...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {as === 'textarea' && (
        <textarea
          id={name}
          name={name}
          required={required}
          className={`${baseControlClasses} ${borderClass} resize-none`}
          {...textareaProps}
        />
      )}

      {error && (
        <span className="text-[11px] font-medium text-rose-600 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
}