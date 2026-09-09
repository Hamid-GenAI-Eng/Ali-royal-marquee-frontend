import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Phone, Truck, FileText, Star } from 'lucide-react';
import clsx from 'clsx';
// import { } from '../../context/ToastContext';

type TabType = 'overview' | 'purchases' | 'payables' | 'services' | 'contracts' | 'performance' | 'activity';

export const VendorDetails = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const { vendors, expenses } = useMockData();

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const vendor = vendors.find((v) => v.id === vendorId);
  const vendorExpenses = expenses.filter(e => e.vendorId === vendor?.id);

  if (!vendor) {
    return <div className="p-8 text-center text-on-surface-variant">Vendor not found.</div>;
  }

  const totalPurchases = vendorExpenses.reduce((sum, e) => sum + e.amount, 0);
  const outstanding = vendorExpenses.filter(e => e.paymentStatus !== 'Paid').reduce((sum, e) => sum + e.amount, 0);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Supplier Overview' },
    { id: 'purchases', label: 'Purchase History' },
    { id: 'payables', label: 'Payables & Ledger' },
    { id: 'services', label: 'Products/Services' },
    { id: 'contracts', label: 'Contracts' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      {/* HEADER SECTION */}
      <div className="border-b border-outline-variant/30 bg-surface px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <button onClick={() => navigate('/app/vendors')} className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Vendors
          </button>
          <span>/</span>
          <span className="font-medium text-on-surface">{vendor.id}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-surface-variant text-on-surface-variant font-headline-lg flex items-center justify-center rounded-full shrink-0">
              <Truck className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-on-surface">{vendor.name}</h1>
                <Badge variant={vendor.status === 'Active' ? 'success' : 'neutral'} className="text-sm px-3 py-1">
                  {vendor.status}
                </Badge>
              </div>
              <div className="flex items-center flex-wrap gap-4 text-on-surface-variant mt-2">
                <div className="flex items-center gap-1.5"><Badge variant="neutral">{vendor.category}</Badge></div>
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {vendor.phone}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Button variant="primary" icon="add_shopping_cart">Create Purchase</Button>
              <Button variant="secondary" icon="payments">Record Payment</Button>
              <Button variant="outline" icon="edit">Edit Vendor</Button>
            </div>
            <div className="flex items-center justify-end gap-3 text-sm">
              <button className="text-primary hover:underline flex items-center gap-1"><FileText className="w-4 h-4"/> Add Contract</button>
              <span className="text-outline-variant">•</span>
              <button className="text-primary hover:underline flex items-center gap-1"><Star className="w-4 h-4"/> Rate Vendor</button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="px-8 py-6 bg-surface-container-lowest border-b border-outline-variant/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Total Purchases</div>
            <div className="text-3xl font-currency-num font-bold text-on-surface">PKR {totalPurchases.toLocaleString()}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Outstanding Payables</div>
            <div className="text-3xl font-currency-num font-bold text-error">PKR {outstanding.toLocaleString()}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Total Transactions</div>
            <div className="text-3xl font-bold text-on-surface">{vendorExpenses.length}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Vendor Rating</div>
              <div className="text-3xl font-bold text-primary flex items-center gap-2">4.8 <Star className="w-6 h-6 fill-primary" /></div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="px-8 border-b border-outline-variant/30 flex overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2",
              activeTab === tab.id 
                ? "border-primary text-primary" 
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h3 className="font-title-lg mb-4">Contact Information</h3>
                <div className="bg-surface rounded-xl border border-outline-variant/40 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Contact Person</div>
                    <div className="col-span-2 font-medium">Imran Khan</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Phone</div>
                    <div className="col-span-2 font-medium">{vendor.phone}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Email</div>
                    <div className="col-span-2 font-medium">contact@{vendor.name.toLowerCase().replace(' ', '')}.com</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 text-on-surface-variant text-sm">Address</div>
                    <div className="col-span-2 font-medium">Main Market, Lahore</div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="font-title-lg mb-4">Business Terms</h3>
                <div className="bg-surface rounded-xl border border-outline-variant/40 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Payment Terms</div>
                    <div className="col-span-2 font-medium">Net 15 Days</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Preferred Method</div>
                    <div className="col-span-2 font-medium">Bank Transfer</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Delivery Lead Time</div>
                    <div className="col-span-2 font-medium">48 Hours</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-title-lg">Recent Purchases</h3>
              <Button variant="primary" icon="add">New Purchase Order</Button>
            </div>
            <div className="bg-surface border border-outline-variant/40 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-variant/30 text-on-surface-variant text-sm">
                  <tr>
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {vendorExpenses.map(expense => (
                    <tr key={expense.id} className="hover:bg-surface-variant/30">
                      <td className="p-4 font-medium text-primary">{expense.id}</td>
                      <td className="p-4 text-on-surface">{expense.dateStr}</td>
                      <td className="p-4 text-on-surface">{expense.category}</td>
                      <td className="p-4">
                        <Badge variant={expense.paymentStatus === 'Paid' ? 'success' : 'warning'}>
                          {expense.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'}
                        </Badge>
                      </td>
                      <td className="p-4 text-right font-currency-num text-on-surface font-medium">
                        PKR {expense.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {vendorExpenses.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-on-surface-variant">No purchases recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholders for others */}
        {['payables', 'services', 'contracts', 'performance'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <h3 className="text-xl font-medium text-on-surface mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Workspace</h3>
            <p>Ready for integration.</p>
          </div>
        )}
      </div>
    </div>
  );
};
