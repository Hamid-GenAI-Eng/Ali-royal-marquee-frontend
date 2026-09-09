import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';
// import { } from '../../components/ui/Button';
import { Input } from '../../components/ui/forms/Input';
import { Select } from '../../components/ui/forms/Select';
import { FormSection, FormActions } from '../../components/ui/forms/FormLayout';
import { useToast } from '../../context/ToastContext';

export const EnquiryForm = () => {
  const navigate = useNavigate();
  const { addEnquiry, addCustomer, customers } = useMockData();
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerPhone: '',
    eventName: '',
    dateStr: '',
    guests: 0,
    source: 'Walk-in',
    leadTemp: 'Warm',
    assignedTo: 'Ali Raza',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      let finalCustomerId = formData.customerId;
      if (!finalCustomerId) {
        finalCustomerId = `CUST-${Math.floor(Math.random() * 1000)}`;
        addCustomer({
          id: finalCustomerId,
          name: formData.customerName,
          phone: formData.customerPhone,
          email: '',
          tier: 'Standard',
          totalSpent: 0
        });
      }

      const enquiryId = `ENQ-${Math.floor(Math.random() * 9000) + 1000}`;
      addEnquiry({
        id: enquiryId,
        customerId: finalCustomerId,
        eventName: formData.eventName,
        dateStr: formData.dateStr,
        guests: Number(formData.guests),
        status: 'New',
        assignedTo: formData.assignedTo,
        createdAt: new Date().toISOString().split('T')[0]
      });

      setIsSubmitting(false);
      success('Enquiry created successfully');
      navigate(`/app/enquiries/${enquiryId}`);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-on-surface">New Enquiry</h1>

      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-0">
        
        <FormSection title="Customer Details">
          <Select 
            label="Existing Customer" 
            name="customerId"
            value={formData.customerId}
            onChange={(e) => {
              const cust = customers.find(c => c.id === e.target.value);
              if (cust) {
                setFormData(prev => ({
                  ...prev, 
                  customerId: cust.id, 
                  customerName: cust.name, 
                  customerPhone: cust.phone
                }));
              } else {
                setFormData(prev => ({ ...prev, customerId: '', customerName: '', customerPhone: '' }));
              }
            }}
            options={[
              { label: '-- Create New Customer --', value: '' },
              ...customers.map(c => ({ label: `${c.name} (${c.phone})`, value: c.id }))
            ]}
          />
          <div />
          <Input 
            label="Full Name" 
            name="customerName" 
            value={formData.customerName} 
            onChange={handleChange}
            required 
          />
          <Input 
            label="Phone Number" 
            name="customerPhone" 
            value={formData.customerPhone} 
            onChange={handleChange}
            required 
          />
        </FormSection>

        <FormSection title="Event Requirements" className="border-t border-outline-variant">
          <Input 
            label="Event Type / Name" 
            name="eventName" 
            placeholder="e.g. Birthday Party"
            value={formData.eventName} 
            onChange={handleChange}
            required 
          />
          <Input 
            label="Preferred Date" 
            name="dateStr" 
            type="date"
            value={formData.dateStr} 
            onChange={handleChange}
            required 
          />
          <Input 
            label="Expected Guests" 
            name="guests" 
            type="number"
            value={formData.guests} 
            onChange={handleChange}
            required 
          />
        </FormSection>

        <FormSection title="CRM Details" className="border-t border-outline-variant">
          <Select 
            label="Lead Source" 
            name="source"
            value={formData.source}
            onChange={handleChange}
            options={[
              { label: 'Walk-in', value: 'Walk-in' },
              { label: 'Phone Call', value: 'Phone' },
              { label: 'WhatsApp', value: 'WhatsApp' },
              { label: 'Website', value: 'Website' },
              { label: 'Referral', value: 'Referral' }
            ]}
          />
          <Select 
            label="Lead Temperature" 
            name="leadTemp"
            value={formData.leadTemp}
            onChange={handleChange}
            options={[
              { label: 'Hot (Ready to book)', value: 'Hot' },
              { label: 'Warm (Evaluating)', value: 'Warm' },
              { label: 'Cold (Just asking)', value: 'Cold' }
            ]}
          />
          <Select 
            label="Assign To" 
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            options={[
              { label: 'Ali Raza', value: 'Ali Raza' },
              { label: 'Sara Khan', value: 'Sara Khan' },
              { label: 'Zahid Khan', value: 'Zahid Khan' }
            ]}
          />
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-on-surface flex flex-col gap-1.5 w-full">
              Initial Notes
              <textarea 
                name="notes"
                className="w-full h-24 px-3 py-2 bg-surface border border-outline-variant rounded-lg outline-none transition-all duration-200 text-on-surface text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Enter any specific requirements or notes..."
                value={formData.notes}
                onChange={handleChange}
              />
            </label>
          </div>
        </FormSection>

        <FormActions 
          onCancel={() => navigate('/app/enquiries')} 
          onSave={handleSubmit} 
          isSaving={isSubmitting} 
          saveLabel="Create Enquiry" 
        />
      </div>
    </div>
  );
};
