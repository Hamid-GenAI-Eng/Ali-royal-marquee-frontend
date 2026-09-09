import React, { useEffect } from 'react';
import clsx from 'clsx';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div className={clsx(
      'flex items-start gap-3 p-4 mb-3 border rounded-lg shadow-lg max-w-sm w-full transition-all duration-300 transform translate-y-0 opacity-100',
      bgColors[type]
    )}>
      <div className="shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        {title && <h4 className="text-sm font-semibold text-gray-900">{title}</h4>}
        <p className="text-sm text-gray-700 mt-0.5">{message}</p>
      </div>
      <button 
        onClick={() => onClose(id)}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
