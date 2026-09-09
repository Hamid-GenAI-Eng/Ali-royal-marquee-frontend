import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export const Button = ({ 
  children, 
  variant = 'secondary', 
  icon, 
  iconPosition = 'left', 
  className,
  disabled,
  ...props 
}: ButtonProps) => {
  
  const baseStyles = "inline-flex items-center justify-center gap-2 font-title-sm text-title-sm font-semibold transition-all";
  
  const variants = {
    primary: "bg-primary-container hover:bg-primary text-on-primary px-5 py-2.5 rounded shadow-md hover:shadow-lg ring-1 ring-secondary-fixed/40",
    secondary: "bg-surface-container-lowest hover:bg-surface-container-low text-on-surface px-4 py-2.5 rounded shadow-sm hover:shadow",
    outline: "border border-outline hover:bg-surface-container-low text-on-surface px-4 py-2.5 rounded",
    text: "hover:bg-surface-container-lowest text-primary px-3 py-2 rounded",
    icon: "w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface",
  };

  const isDisabled = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  return (
    <button 
      className={clsx(baseStyles, variants[variant], isDisabled, className)}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={clsx("material-symbols-outlined", variant === 'icon' ? "text-[20px]" : "text-[18px]")}>
          {icon}
        </span>
      )}
      
      {variant !== 'icon' && children}

      {icon && iconPosition === 'right' && (
        <span className={clsx("material-symbols-outlined", variant === 'icon' ? "text-[20px]" : "text-[18px]")}>
          {icon}
        </span>
      )}
    </button>
  );
};
