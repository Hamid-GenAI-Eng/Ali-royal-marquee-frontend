import React, { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ 
  label, 
  options,
  error, 
  helperText, 
  leftIcon,
  className,
  id,
  ...props 
}, ref) => {
  const selectId = id || `select-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={clsx("flex flex-col gap-1.5 w-full", className)}>
      <label htmlFor={selectId} className="text-sm font-medium text-on-surface">
        {label} {props.required && <span className="text-error">*</span>}
      </label>
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-on-surface-variant flex items-center pointer-events-none z-10">
            {leftIcon}
          </div>
        )}
        
        <select
          id={selectId}
          ref={ref}
          className={clsx(
            "w-full h-11 px-3 py-2 bg-surface border rounded-lg outline-none transition-all duration-200 appearance-none",
            "text-on-surface text-sm",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "disabled:bg-surface-variant/30 disabled:text-on-surface-variant disabled:cursor-not-allowed",
            error ? "border-error focus:ring-error/20 focus:border-error" : "border-outline-variant",
            leftIcon && "pl-10",
            "pr-10" // Space for dropdown icon
          )}
          {...props}
        >
          {/* Default empty option if not explicitly selected or required */}
          {!props.value && !props.defaultValue && (
            <option value="" disabled hidden>Select an option</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        
        <div className="absolute right-3 text-on-surface-variant flex items-center pointer-events-none">
          {error ? <AlertCircle className="w-5 h-5 text-error" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>
      
      {(error || helperText) && (
        <p className={clsx("text-xs mt-0.5", error ? "text-error font-medium" : "text-on-surface-variant")}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
