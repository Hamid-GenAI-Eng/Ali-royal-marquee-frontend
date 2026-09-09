import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FormSection, FormActions } from '../../components/ui/forms/FormLayout';
import { Input } from '../../components/ui/forms/Input';
import { Select } from '../../components/ui/forms/Select';

export const PackageForm = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Package created successfully');
      navigate('/app/packages');
    }, 800);
  };

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Create New Package"
        category="Commercial Offerings"
        onBack={() => navigate(-1)}
      />

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/60 p-8 max-w-4xl mx-auto">
        <FormSection title="Package Configuration" description="Define tier pricing and base details.">
          <Input label="Package Name" placeholder="e.g. Royal Diamond Package" className="col-span-1 md:col-span-2" />
          <Select 
            label="Tier / Type"
            options={[
              { value: 'Premium', label: 'Premium' },
              { value: 'Standard', label: 'Standard' },
              { value: 'Basic', label: 'Basic' },
              { value: 'Custom', label: 'Customizable' },
            ]}
          />
          <Input label="Base Price (PKR/head)" type="number" placeholder="0.00" />
          <Input label="Minimum Guests" type="number" defaultValue="100" />
          <Input label="Profit Margin Target (%)" type="number" defaultValue="30" />
        </FormSection>

        <FormSection title="Core Inclusions" description="Select standard features included in this tier." className="col-span-1 md:col-span-2">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="inc1" className="w-5 h-5 rounded text-primary border-outline-variant/60 bg-surface-container-low" />
              <label htmlFor="inc1" className="text-body-md text-on-surface font-medium">Premium Hall Setup & Ambience</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="inc2" className="w-5 h-5 rounded text-primary border-outline-variant/60 bg-surface-container-low" />
              <label htmlFor="inc2" className="text-body-md text-on-surface font-medium">Standard Floral Decor</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="inc3" className="w-5 h-5 rounded text-primary border-outline-variant/60 bg-surface-container-low" />
              <label htmlFor="inc3" className="text-body-md text-on-surface font-medium">Basic Photography/Videography</label>
            </div>
            
            <div className="mt-4 pt-4">
               <Input label="Internal Notes / Strategy" placeholder="Enter notes here..." />
            </div>
          </div>
        </FormSection>

        <FormActions 
          onCancel={() => navigate(-1)} 
          onSave={handleSubmit} 
          isSaving={isSubmitting} 
          saveLabel="Save Package" 
        />
      </div>
    </div>
  );
};
