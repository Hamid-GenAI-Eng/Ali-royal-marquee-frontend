import React, { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  error, 
  helperText, 
  leftIcon, 
  rightIcon,
  className,
  id,
  ...props 
}, ref) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={clsx("flex flex-col gap-1.5 w-full", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-on-surface">
        {label} {props.required && <span className="text-error">*</span>}
      </label>
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-on-surface-variant flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            "w-full h-11 px-3 py-2 bg-surface border rounded-lg outline-none transition-all duration-200",
            "text-on-surface placeholder:text-on-surface-variant/50 text-sm",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "disabled:bg-surface-variant/30 disabled:text-on-surface-variant disabled:cursor-not-allowed",
            error ? "border-error focus:ring-error/20 focus:border-error" : "border-outline-variant",
            leftIcon && "pl-10",
            rightIcon && "pr-10"
          )}
          {...props}
        />
        
        {rightIcon && !error && (
          <div className="absolute right-3 text-on-surface-variant flex items-center">
            {rightIcon}
          </div>
        )}
        
        {error && (
          <div className="absolute right-3 text-error flex items-center pointer-events-none">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={clsx("text-xs mt-0.5", error ? "text-error font-medium" : "text-on-surface-variant")}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
