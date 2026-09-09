import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FormSection, FormActions } from '../../components/ui/forms/FormLayout';
import { Input } from '../../components/ui/forms/Input';
import { Select } from '../../components/ui/forms/Select';

export const StaffForm = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Employee added successfully');
      navigate('/app/staff');
    }, 800);
  };

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Add New Employee"
        category="Human Resources"
        onBack={() => navigate(-1)}
      />

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/60 p-8 max-w-4xl mx-auto">
        <FormSection title="Personal Information" description="Basic demographic and identification details.">
          <Input label="First Name" placeholder="e.g. Ali" />
          <Input label="Last Name" placeholder="e.g. Raza" />
          <Input label="Phone Number" placeholder="+92 3XX XXXXXXX" />
          <Input label="CNIC" placeholder="XXXXX-XXXXXXX-X" />
          <div className="col-span-1 md:col-span-2">
            <Input label="Emergency Contact (Optional)" placeholder="Name & Phone" />
          </div>
        </FormSection>

        <FormSection title="Employment Details" description="Role, department, and employment status.">
          <Select 
            label="Role"
            options={[
              { value: 'Manager', label: 'Manager' },
              { value: 'Coordinator', label: 'Coordinator' },
              { value: 'Service', label: 'Service Staff' },
              { value: 'Security', label: 'Security' },
            ]}
          />
          <Input label="Department" placeholder="e.g. Operations" />
          <Select 
            label="Employment Status"
            options={[
              { value: 'Full-time', label: 'Full-time' },
              { value: 'Part-time', label: 'Part-time' },
              { value: 'Contract', label: 'Contract' },
            ]}
          />
        </FormSection>

        <FormActions 
          onCancel={() => navigate(-1)} 
          onSave={handleSubmit} 
          isSaving={isSubmitting} 
          saveLabel="Save Employee" 
        />
      </div>
    </div>
  );
};
