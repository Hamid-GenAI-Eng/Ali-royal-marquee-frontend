import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMockData } from '../../context/MockDataContext';

export const BusinessVendors = () => {
  const navigate = useNavigate();
  const { vendors } = useMockData();

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Business Vendors"
        category="Supplier Intelligence"
        icon="storefront"
        description="Supplier risk, payables overview, and contract management."
        actions={
          <Button variant="primary" icon="edit" onClick={() => navigate('/app/vendors', { state: { fromBusiness: true } })}>Manage Vendors</Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Vendors</div>
          <div className="text-3xl font-bold text-on-surface">{vendors.length}</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Outstanding Payables</div>
          <div className="text-3xl font-currency-num font-bold text-error">PKR 850,000</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Contracts Expiring</div>
          <div className="text-3xl font-bold text-warning">2</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg Vendor Rating</div>
          <div className="text-3xl font-bold text-primary">4.6 / 5</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
          <h3 className="font-title-lg mb-4">Top Vendors by Spending</h3>
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-variant/30 text-on-surface-variant text-sm">
              <tr>
                <th className="p-4 font-medium rounded-tl-lg">Vendor</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium text-right rounded-tr-lg">YTD Spending</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {vendors.slice(0,3).map(vendor => (
                <tr key={vendor.id}>
                  <td className="p-4 font-medium">{vendor.name}</td>
                  <td className="p-4"><Badge variant="neutral">{vendor.category}</Badge></td>
                  <td className="p-4 text-right font-currency-num">PKR {(Math.random() * 500000 + 100000).toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
