import React, { useEffect } from 'react';
import clsx from 'clsx';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
}

export const Drawer = ({ isOpen, onClose, title, subtitle, children, footer, width = 'md' }: DrawerProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const widthClass = {
    md: 'w-full max-w-md',
    lg: 'w-full max-w-2xl',
    xl: 'w-full max-w-4xl',
  }[width];

  return (
    <>
      {/* Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 bg-surface-container-highest/60 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div 
        className={clsx(
          "fixed top-0 right-0 bottom-0 bg-surface-container-lowest shadow-2xl z-[101] flex flex-col transition-transform duration-300 ease-in-out transform",
          widthClass,
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-highest">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight">{title}</h2>
            {subtitle && (
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-surface-container-highest bg-surface-container-lowest">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};
