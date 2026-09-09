import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, CreditCard, Calendar } from 'lucide-react';
import clsx from 'clsx';

type TabType = 'receipt' | 'booking' | 'customer' | 'audit';

export const PaymentDetails = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const navigate = useNavigate();
  const { payments, bookings, customers } = useMockData();

  const [activeTab, setActiveTab] = useState<TabType>('receipt');

  const payment = payments.find((p) => p.id === paymentId);
  const booking = bookings.find((b) => b.id === payment?.bookingId);
  const customer = customers.find((c) => c.id === booking?.customerId);

  if (!payment || !booking || !customer) {
    return <div className="p-8 text-center text-on-surface-variant">Payment not found.</div>;
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'receipt', label: 'Payment Receipt' },
    { id: 'booking', label: 'Booking Summary' },
    { id: 'customer', label: 'Customer Info' },
    { id: 'audit', label: 'Activity/Audit' },
  ];

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      {/* HEADER SECTION */}
      <div className="border-b border-outline-variant/30 bg-surface px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <button onClick={() => navigate('/app/payments')} className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Payments
          </button>
          <span>/</span>
          <span className="font-medium text-on-surface">{payment.id}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-success-container text-on-success-container font-headline-lg flex items-center justify-center rounded-full shrink-0">
              <CreditCard className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-on-surface">{payment.id}</h1>
                <Badge variant={payment.status === 'Completed' ? 'success' : 'warning'} className="text-sm px-3 py-1">
                  {payment.status}
                </Badge>
              </div>
              <div className="flex items-center flex-wrap gap-4 text-on-surface-variant mt-2">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {payment.dateStr}</div>
                <div className="flex items-center gap-1.5"><Badge variant="neutral">{payment.method}</Badge></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Button variant="primary" icon="print">Print Receipt</Button>
              <Button variant="outline" icon="send">Send Receipt</Button>
            </div>
            <div className="flex items-center justify-end gap-3 text-sm">
              <button className="text-primary hover:underline flex items-center gap-1">Edit</button>
              <span className="text-outline-variant">•</span>
              <button className="text-error hover:underline flex items-center gap-1">Reverse/Void</button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="px-8 py-6 bg-surface-container-lowest border-b border-outline-variant/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-success"></div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Amount Paid</div>
            <div className="text-3xl font-currency-num font-bold text-success">PKR {payment.amount.toLocaleString()}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Reference</div>
            <div className="text-xl font-mono font-bold text-on-surface mt-2">{payment.reference}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Linked Booking</div>
            <div className="text-xl font-bold text-primary mt-2 cursor-pointer hover:underline" onClick={() => navigate(`/app/bookings/${booking.id}`)}>{booking.id}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Customer</div>
            <div className="text-xl font-bold text-on-surface mt-2 truncate">{customer.name}</div>
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
        {activeTab === 'receipt' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-start border-b border-outline-variant/20 pb-6 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface">Payment Receipt</h3>
                  <div className="text-on-surface-variant mt-1">Receipt #: {payment.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">Ali Royal Marquee</div>
                  <div className="text-sm text-on-surface-variant">Main Boulevard, Lahore</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-sm text-on-surface-variant mb-1">Received From:</div>
                  <div className="font-semibold text-lg">{customer.name}</div>
                  <div className="text-sm text-on-surface-variant">{customer.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-on-surface-variant mb-1">Payment Date:</div>
                  <div className="font-semibold">{payment.dateStr}</div>
                </div>
              </div>

              <table className="w-full text-left border-collapse mb-8">
                <thead className="bg-surface-variant/30 text-on-surface-variant text-sm border-y border-outline-variant/20">
                  <tr>
                    <th className="py-3 px-2 font-medium">Description</th>
                    <th className="py-3 px-2 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr>
                    <td className="py-4 px-2">
                      <div className="font-medium">Payment for Booking {booking.id}</div>
                      <div className="text-sm text-on-surface-variant mt-1">Method: {payment.method} | Ref: {payment.reference}</div>
                    </td>
                    <td className="py-4 px-2 text-right font-currency-num font-bold">
                      PKR {payment.amount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t border-outline-variant/20 pt-6 text-sm text-on-surface-variant text-center">
                This is a computer-generated receipt and does not require a signature.
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for others */}
        {['booking', 'customer', 'audit'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <h3 className="text-xl font-medium text-on-surface mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Workspace</h3>
            <p>Ready for integration.</p>
          </div>
        )}
      </div>
    </div>
  );
};
