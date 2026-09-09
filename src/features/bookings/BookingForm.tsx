import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/forms/Input';
import { Select } from '../../components/ui/forms/Select';
import { FormSection, FormActions } from '../../components/ui/forms/FormLayout';
import { useToast } from '../../context/ToastContext';
import { Check, ChevronRight, User, Calendar, MapPin, DollarSign, Package } from 'lucide-react';

const steps = [
  { id: 1, name: 'Customer', icon: User },
  { id: 2, name: 'Event', icon: Calendar },
  { id: 3, name: 'Venue', icon: MapPin },
  { id: 4, name: 'Package', icon: Package },
  { id: 5, name: 'Payment', icon: DollarSign },
  { id: 6, name: 'Review', icon: Check },
];

export const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking, addEvent, addPayment, addCustomer, customers } = useMockData();
  const { success } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Customer
    customerId: location.state?.customer?.id || '',
    customerName: location.state?.customer?.name || '',
    customerPhone: location.state?.customer?.phone || '',
    // Event
    eventType: location.state?.fromEnquiry?.eventName || '',
    date: location.state?.fromEnquiry?.dateStr || '',
    shift: 'Night',
    guests: location.state?.fromEnquiry?.guests || 0,
    // Venue
    hall: 'Grand Ballroom',
    // Financial
    totalAmount: 1500000,
    advanceAmount: 500000,
    paymentMethod: 'Bank Transfer'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // 1. Create Customer if new
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

      // 2. Create Booking
      const bookingId = `BK-${Math.floor(Math.random() * 9000) + 1000}`;
      addBooking({
        id: bookingId,
        customerId: finalCustomerId,
        eventId: '',
        hall: formData.hall as any,
        dateStr: formData.date,
        shift: formData.shift as any,
        guests: Number(formData.guests),
        totalAmount: formData.totalAmount,
        paidAmount: formData.advanceAmount,
        status: 'Confirmed',
        paymentStatus: formData.advanceAmount >= formData.totalAmount ? 'Paid' : 'Partial',
        createdAt: new Date().toISOString().split('T')[0]
      });

      // 3. Create Event
      const eventId = `EV-${Math.floor(Math.random() * 9000) + 1000}`;
      addEvent({
        id: eventId,
        bookingId: bookingId,
        title: formData.eventType,
        dateStr: formData.date,
        startTime: formData.shift === 'Night' ? '18:00' : '10:00',
        endTime: formData.shift === 'Night' ? '23:30' : '15:30',
        status: 'Upcoming',
        manager: 'Unassigned'
      });

      // 4. Record Payment
      addPayment({
        id: `PAY-${Math.floor(Math.random() * 9000) + 1000}`,
        bookingId: bookingId,
        customerId: finalCustomerId,
        amount: formData.advanceAmount,
        method: formData.paymentMethod as any,
        status: 'Completed',
        dateStr: new Date().toISOString().split('T')[0],
        reference: `TRX-${Math.floor(Math.random() * 90000)}`
      });

      setIsSubmitting(false);
      success('Booking created successfully');
      navigate(`/app/bookings/${bookingId}`);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-on-surface">New Booking</h1>
        <Button variant="outline" onClick={() => navigate('/app/bookings')}>Cancel</Button>
      </div>

      {/* Stepper */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-outline-variant/50 -z-10" />
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-surface px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isActive ? 'border-primary bg-primary text-on-primary' : 
                  isCompleted ? 'border-primary bg-primary-container text-on-primary-container' : 
                  'border-outline-variant bg-surface text-on-surface-variant'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium ${isActive || isCompleted ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-surface border border-outline-variant rounded-xl shadow-sm p-6 min-h-[400px]">
        
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <FormSection title="Customer Information" description="Select an existing customer or enter details for a new one.">
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
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <FormSection title="Event Details" description="Basic event information.">
              <Input 
                label="Event Title" 
                name="eventType" 
                placeholder="e.g. Walima, Corporate Dinner"
                value={formData.eventType} 
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
              <Input 
                label="Event Date" 
                name="date" 
                type="date"
                value={formData.date} 
                onChange={handleChange}
                required 
              />
              <Select 
                label="Shift" 
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                options={[
                  { label: 'Day (10:00 - 15:30)', value: 'Day' },
                  { label: 'Night (18:00 - 23:30)', value: 'Night' }
                ]}
              />
            </FormSection>
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <FormSection title="Venue & Availability" description="Select a hall.">
              <Select 
                label="Venue Hall" 
                name="hall"
                value={formData.hall}
                onChange={handleChange}
                options={[
                  { label: 'Grand Ballroom (Capacity: 1000)', value: 'Grand Ballroom' },
                  { label: 'Royal Marquee (Capacity: 800)', value: 'Royal Marquee' },
                  { label: 'Crystal Pavilion (Capacity: 500)', value: 'Crystal Pavilion' }
                ]}
              />
              <div className="col-span-1 md:col-span-2 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">Venue Available</h4>
                  <p className="text-sm text-green-700">The selected venue is available for the requested date and shift.</p>
                </div>
              </div>
            </FormSection>
          </div>
        )}

        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center justify-center h-48">
            <p className="text-on-surface-variant mb-4">Package selection interface would go here.</p>
            <Button variant="outline" onClick={handleNext}>Skip for now</Button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center justify-center h-48">
            <p className="text-on-surface-variant mb-4">Add-ons interface would go here.</p>
            <Button variant="outline" onClick={handleNext}>Skip for now</Button>
          </div>
        )}

        {currentStep === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <FormSection title="Final Review" description="Review details and record advance payment.">
              <div className="col-span-1 md:col-span-2 bg-surface-variant/20 p-4 rounded-lg border border-outline-variant mb-4">
                <h4 className="font-semibold text-on-surface mb-2">Summary</h4>
                <p className="text-sm text-on-surface-variant">Customer: {formData.customerName}</p>
                <p className="text-sm text-on-surface-variant">Event: {formData.eventType} on {formData.date}</p>
                <p className="text-sm text-on-surface-variant">Venue: {formData.hall} ({formData.guests} guests)</p>
              </div>

              <Input 
                label="Grand Total (PKR)" 
                name="totalAmount" 
                type="number"
                value={formData.totalAmount} 
                onChange={handleChange}
                required 
              />
              <Input 
                label="Advance Payment Received (PKR)" 
                name="advanceAmount" 
                type="number"
                value={formData.advanceAmount} 
                onChange={handleChange}
                required 
              />
              <Select 
                label="Payment Method" 
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                options={[
                  { label: 'Cash', value: 'Cash' },
                  { label: 'Bank Transfer', value: 'Bank Transfer' },
                  { label: 'Cheque', value: 'Cheque' },
                  { label: 'Card', value: 'Card' }
                ]}
              />
            </FormSection>
          </div>
        )}

      </div>

      <div className="flex items-center justify-between mt-2">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentStep === 1}
        >
          Back
        </Button>
        {currentStep < steps.length ? (
          <Button variant="primary" onClick={handleNext}>
            Next Step <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
          </Button>
        )}
      </div>

    </div>
  );
};
