import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  footer,
  maxWidth = 'md'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className={clsx(
          "bg-surface rounded-xl shadow-xl w-full relative z-50 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200",
          maxWidthClasses[maxWidth]
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-on-surface">{title}</h2>
            {description && (
              <p className="text-sm text-on-surface-variant mt-1">{description}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="px-6 py-4 border-t border-outline-variant bg-surface-variant/30 flex items-center justify-end gap-3 shrink-0 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
