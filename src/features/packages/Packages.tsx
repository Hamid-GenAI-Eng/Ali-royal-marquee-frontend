import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { DataGrid } from '../../components/ui/DataGrid';

// Mock data for packages just to show something
const mockPackages = [
  { id: 'PKG-001', name: 'Silver Walima Package', type: 'Catering & Decor', price: 2500, status: 'Active' },
  { id: 'PKG-002', name: 'Gold Mehndi Package', type: 'Catering & Decor', price: 3500, status: 'Active' },
  { id: 'PKG-003', name: 'Platinum Barat Package', type: 'All-inclusive', price: 5000, status: 'Active' },
];

export const Packages = () => {
  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Event Packages"
        category="Sales & Marketing"
        icon="loyalty"
        description="Manage predefined event packages, catering menus, decor bundles, and seasonal promotions."
        actions={
          <Button variant="primary" icon="add">Create Package</Button>
        }
      />

      <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
        <p className="text-on-surface-variant mb-6">This module is under construction. Below is a preview of available packages.</p>
        
        <DataGrid 
          data={mockPackages}
          columns={[
            { key: 'id', header: 'Package ID', render: (item) => <span className="text-primary font-mono text-[12px] bg-surface-container px-2 py-1 rounded">{item.id}</span> },
            { key: 'name', header: 'Package Name', render: (item) => <span className="font-semibold text-on-surface">{item.name}</span> },
            { key: 'type', header: 'Type' },
            { key: 'price', header: 'Price (Per Pax)', align: 'right', render: (item) => <span className="font-currency-num font-bold text-primary">PKR {item.price.toLocaleString()}</span> }
          ]}
          keyExtractor={(item) => item.id}
          currentPage={1}
          totalPages={1}
          totalItems={mockPackages.length}
        />
      </div>
    </div>
  );
};

export default Packages;
