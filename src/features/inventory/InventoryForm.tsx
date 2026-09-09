import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FormSection, FormActions } from '../../components/ui/forms/FormLayout';
import { Input } from '../../components/ui/forms/Input';
import { Select } from '../../components/ui/forms/Select';

export const InventoryForm = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Item added successfully');
      navigate('/app/inventory');
    }, 800);
  };

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Add Inventory Item"
        category="Operations & Logistics"
        onBack={() => navigate(-1)}
      />

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/60 p-8 max-w-4xl mx-auto">
        <FormSection title="Item Details" description="Add a new physical asset or consumable.">
          <Input label="Item Name" placeholder="e.g. Banquet Chairs" className="col-span-1 md:col-span-2" />
          <Select 
            label="Category"
            options={[
              { value: 'Furniture', label: 'Furniture' },
              { value: 'Decor', label: 'Decor' },
              { value: 'Catering', label: 'Catering Equipment' },
              { value: 'Consumables', label: 'Consumables' },
            ]}
          />
          <Input label="SKU / Barcode" placeholder="Leave blank to auto-generate" />
          <Input label="Initial Quantity" type="number" defaultValue="0" />
          <Input label="Reorder Level" type="number" defaultValue="10" />
          <Input label="Unit" placeholder="pcs, kg, etc." />
          <Input label="Unit Cost (PKR)" type="number" placeholder="0.00" />
          <div className="col-span-1 md:col-span-2">
            <Input label="Supplier (Optional)" placeholder="Select vendor" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Input label="Notes" placeholder="Enter notes..." />
          </div>
        </FormSection>

        <FormActions 
          onCancel={() => navigate(-1)} 
          onSave={handleSubmit} 
          isSaving={isSubmitting} 
          saveLabel="Add Item" 
        />
      </div>
    </div>
  );
};
