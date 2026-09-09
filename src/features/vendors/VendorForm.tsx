import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FormSection, FormActions } from '../../components/ui/forms/FormLayout';
import { Input } from '../../components/ui/forms/Input';
import { Select } from '../../components/ui/forms/Select';

export const VendorForm = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Vendor registered successfully');
      navigate('/app/vendors');
    }, 800);
  };

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Register New Vendor"
        category="Procurement Ledger"
        onBack={() => navigate(-1)}
      />

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/60 p-8 max-w-4xl mx-auto">
        <FormSection title="Company Information" description="Basic details of the supplier or contractor.">
          <Input label="Company / Vendor Name" placeholder="e.g. Royal Foods Pvt Ltd" className="col-span-1 md:col-span-2" />
          <Select 
            label="Category"
            options={[
              { value: 'Catering', label: 'Catering' },
              { value: 'Decor', label: 'Decor & Floral' },
              { value: 'Lighting', label: 'Lighting & Sound' },
              { value: 'Logistics', label: 'Logistics' },
            ]}
          />
          <Input label="Business NTN (Optional)" placeholder="Tax number" />
        </FormSection>

        <FormSection title="Contact Details" description="Primary communication handles.">
          <Input label="Primary Contact Name" placeholder="Full name" />
          <Input label="Phone Number" placeholder="+92 3XX XXXXXXX" />
          <Input label="Email Address" type="email" placeholder="vendor@example.com" />
          <div className="col-span-1 md:col-span-2">
            <Input label="Address" placeholder="Physical address or warehouse location" />
          </div>
        </FormSection>

        <FormActions 
          onCancel={() => navigate(-1)} 
          onSave={handleSubmit} 
          isSaving={isSubmitting} 
          saveLabel="Save Vendor" 
        />
      </div>
    </div>
  );
};
