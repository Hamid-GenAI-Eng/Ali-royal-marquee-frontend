import React, { useState } from 'react';
import clsx from 'clsx';
import { Filter, X } from 'lucide-react';
import { Button } from './Button';

export interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
  children: React.ReactNode;
  activeCount?: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  onApply,
  onClear,
  children,
  activeCount = 0
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-5 mb-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-outline-variant">
        <div className="flex items-center gap-2 text-on-surface font-semibold">
          <Filter className="w-5 h-5 text-primary" />
          <span>Advanced Filters</span>
          {activeCount > 0 && (
            <span className="bg-primary-container text-on-primary-container text-xs font-bold px-2 py-0.5 rounded-full ml-2">
              {activeCount} Active
            </span>
          )}
        </div>
        <button 
          onClick={onClose}
          className="text-on-surface-variant hover:bg-surface-variant p-1.5 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mb-6">
        {children}
      </div>
      
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
        <Button variant="outline" onClick={onClear}>
          Clear All
        </Button>
        <Button variant="primary" onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
