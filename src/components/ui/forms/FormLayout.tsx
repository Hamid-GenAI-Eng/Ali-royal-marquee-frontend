import React from 'react';
import clsx from 'clsx';
import { Button } from '../Button';

export const FormSection: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, children, className }) => (
  <div className={clsx("py-6 first:pt-0", className)}>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
      {description && <p className="text-sm text-on-surface-variant mt-1">{description}</p>}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {children}
    </div>
  </div>
);

export const FormActions: React.FC<{
  onCancel?: () => void;
  onSave?: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  isSaving?: boolean;
  className?: string;
}> = ({ 
  onCancel, 
  onSave, 
  cancelLabel = 'Cancel', 
  saveLabel = 'Save', 
  isSaving = false,
  className
}) => (
  <div className={clsx("flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 mt-6 border-t border-outline-variant", className)}>
    {onCancel && (
      <Button 
        variant="outline" 
        onClick={onCancel}
        disabled={isSaving}
        className="w-full sm:w-auto"
      >
        {cancelLabel}
      </Button>
    )}
    <Button 
      variant="primary" 
      onClick={onSave}
      disabled={isSaving}
      className="w-full sm:w-auto"
    >
      {isSaving ? 'Saving...' : saveLabel}
    </Button>
  </div>
);
