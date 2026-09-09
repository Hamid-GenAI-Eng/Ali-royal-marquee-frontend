import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FormSection, FormActions } from '../../components/ui/forms/FormLayout';
import { Input } from '../../components/ui/forms/Input';
import { Select } from '../../components/ui/forms/Select';

export const PaymentForm = () => {
  const navigate = useNavigate();
  const { bookings, customers } = useMockData();
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCustomer = (id: string) => customers.find(c => c.id === id);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Payment recorded successfully');
      navigate('/app/payments');
    }, 800);
  };

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Record New Payment"
        category="Commercial Operations"
        onBack={() => navigate(-1)}
      />

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/60 p-8 max-w-4xl mx-auto">
        <FormSection title="Payment Details" description="Log a new transaction or installment against a booking.">
          <Select 
            label="Booking Reference"
            className="col-span-1 md:col-span-2"
            options={[
              { value: '', label: 'Select a booking' },
              ...bookings.map(b => ({ value: b.id, label: `${b.id} - ${getCustomer(b.customerId)?.name || 'Unknown'}` }))
            ]}
          />
          <Input label="Amount (PKR)" type="number" placeholder="0.00" />
          <Select 
            label="Payment Method"
            options={[
              { value: 'Bank Transfer', label: 'Bank Transfer' },
              { value: 'Cash', label: 'Cash' },
              { value: 'Credit Card', label: 'Credit Card' },
              { value: 'Cheque', label: 'Cheque' },
            ]}
          />
          <Input label="Payment Date" type="date" />
          <Input label="Reference Number (Optional)" placeholder="Txn ID, Cheque No..." />
          <div className="col-span-1 md:col-span-2">
            <Input label="Internal Notes" placeholder="Add any details regarding this payment..." />
          </div>
        </FormSection>

        <FormActions 
          onCancel={() => navigate(-1)} 
          onSave={handleSubmit} 
          isSaving={isSubmitting} 
          saveLabel="Record Payment" 
        />
      </div>
    </div>
  );
};
