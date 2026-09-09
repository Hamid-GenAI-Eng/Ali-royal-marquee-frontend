import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { useMockData } from '../../context/MockDataContext';

export const BusinessInventory = () => {
  const navigate = useNavigate();
  const { inventory } = useMockData();

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock').length;
  const outOfStockCount = inventory.filter(i => i.status === 'Out of Stock').length;

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Business Inventory"
        category="Asset & Stock Management"
        icon="inventory_2"
        description="High-level inventory intelligence, stock valuation, and reorder alerts."
        actions={
          <Button variant="primary" icon="edit" onClick={() => navigate('/app/inventory', { state: { fromBusiness: true } })}>Manage Inventory</Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Inventory Value</div>
          <div className="text-3xl font-currency-num font-bold text-on-surface">PKR 2.45M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Low Stock Alerts</div>
          <div className="text-3xl font-bold text-warning">{lowStockCount}</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Out of Stock</div>
          <div className="text-3xl font-bold text-error">{outOfStockCount}</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Items Tracked</div>
          <div className="text-3xl font-bold text-on-surface">{inventory.length}</div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl border border-outline-variant/40 p-8 shadow-sm text-center">
        <h3 className="text-xl font-bold mb-4">Detailed Inventory Management</h3>
        <p className="text-on-surface-variant mb-6 max-w-lg mx-auto">
          To view granular stock movements, adjust stock levels, record wastage, and process transfers, please use the main inventory workspace.
        </p>
        <Button variant="primary" onClick={() => navigate('/app/inventory', { state: { fromBusiness: true } })}>Go to Inventory Workspace</Button>
      </div>
    </div>
  );
};
