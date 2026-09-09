import React from 'react';
import clsx from 'clsx';

export type BadgeVariant = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: string;
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', icon, className }: BadgeProps) => {
  const variantStyles = {
    primary: 'bg-primary-container text-on-primary-container',
    secondary: 'bg-secondary-container text-on-secondary-container',
    error: 'bg-error-container text-on-error-container',
    success: 'bg-[#C8F6E6] text-[#006C4C]', // Custom emerald colors mapped to Material
    warning: 'bg-[#FFEFD6] text-[#7A5900]',
    neutral: 'bg-surface-container-high text-on-surface-variant',
  };

  return (
    <span className={clsx(
      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-label-sm text-label-sm font-bold tracking-wide uppercase",
      variantStyles[variant],
      className
    )}>
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </span>
  );
};
