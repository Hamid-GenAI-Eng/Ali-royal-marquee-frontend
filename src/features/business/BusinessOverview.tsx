import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar as EventIcon, AlertCircle, ArrowRight } from 'lucide-react';
import { useMockData } from '../../context/MockDataContext';

export const BusinessOverview = () => {
  const navigate = useNavigate();
  const { bookings, expenses, events } = useMockData();

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const healthScore = 87;

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Business Overview"
        category="Business Intelligence"
        icon="domain"
        description="A complete operational and financial view of Ali Royal Marquee."
        actions={
          <>
            <Button variant="outline" icon="payments" onClick={() => navigate('/app/payments', { state: { fromBusiness: true } })}>Record Payment</Button>
            <Button variant="outline" icon="receipt_long" onClick={() => navigate('/app/expenses', { state: { fromBusiness: true } })}>Add Expense</Button>
            <Button variant="primary" icon="add" onClick={() => navigate('/app/bookings/new')}>New Booking</Button>
          </>
        }
      />

      {/* HEALTH SCORE & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-outline-variant/50 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-success"></div>
          <div className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Business Health</div>
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-surface-variant" />
              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={56 * 2 * Math.PI} strokeDashoffset={56 * 2 * Math.PI * (1 - healthScore/100)} className="text-success" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold text-on-surface">{healthScore}</span>
              <span className="text-xs text-on-surface-variant">/ 100</span>
            </div>
          </div>
          <div className="text-sm text-success mt-4 flex items-center gap-1 font-medium">
            <TrendingUp className="w-4 h-4" /> Operations Stable
          </div>
        </div>

        <div className="lg:col-span-3 bg-error-container/20 border border-error/20 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-error" />
            <h3 className="font-semibold text-error text-lg">Business Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-lg border border-error/10 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-error mt-1.5 shrink-0"></div>
              <div>
                <div className="font-medium text-on-surface text-sm">PKR 640K Overdue</div>
                <div className="text-xs text-on-surface-variant mt-0.5">3 bookings have missed their payment schedules.</div>
                <button className="text-error text-xs font-semibold mt-2 hover:underline">View Receivables</button>
              </div>
            </div>
            <div className="bg-surface p-4 rounded-lg border border-warning/20 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-warning mt-1.5 shrink-0"></div>
              <div>
                <div className="font-medium text-on-surface text-sm">Main Hall utilization 86%</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Approaching maximum capacity for October.</div>
              </div>
            </div>
            <div className="bg-surface p-4 rounded-lg border border-warning/20 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-warning mt-1.5 shrink-0"></div>
              <div>
                <div className="font-medium text-on-surface text-sm">Food wastage increased 18%</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Last 3 events showed higher than normal rice wastage.</div>
              </div>
            </div>
            <div className="bg-surface p-4 rounded-lg border border-error/10 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-error mt-1.5 shrink-0"></div>
              <div>
                <div className="font-medium text-on-surface text-sm">2 events have staffing gaps</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Upcoming weekend events require 8 more servers.</div>
                <button onClick={() => navigate('/app/business/staff')} className="text-error text-xs font-semibold mt-2 hover:underline">Manage Staffing</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FINANCIAL SUMMARY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" /> Financial Summary
            </h2>
            <button onClick={() => navigate('/app/business/finances')} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-5">
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Revenue</div>
              <div className="text-2xl font-currency-num font-bold text-on-surface">PKR {(totalRevenue/1000000).toFixed(2)}M</div>
              <div className="text-xs text-success flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +12.5%</div>
            </div>
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-5">
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Expenses</div>
              <div className="text-2xl font-currency-num font-bold text-on-surface">PKR {(totalExpenses/1000000).toFixed(2)}M</div>
              <div className="text-xs text-error flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +4.2%</div>
            </div>
            <div className="col-span-2 bg-primary-container text-on-primary-container rounded-xl p-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
                <DollarSign className="w-32 h-32" />
              </div>
              <div className="text-sm font-medium uppercase tracking-wider mb-1 opacity-80">Net Profit (YTD)</div>
              <div className="text-4xl font-currency-num font-bold">PKR {(netProfit/1000000).toFixed(2)}M</div>
            </div>
          </div>
        </div>

        {/* OPERATIONAL SUMMARY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <EventIcon className="w-5 h-5 text-secondary" /> Operational Summary
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-5">
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Active Bookings</div>
              <div className="text-2xl font-bold text-on-surface">{bookings.length}</div>
            </div>
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-5">
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Events This Month</div>
              <div className="text-2xl font-bold text-on-surface">{events.length}</div>
            </div>
            <div className="col-span-2 bg-surface border border-outline-variant/40 rounded-xl p-5">
              <div className="text-sm font-medium text-on-surface mb-3">Venue Utilization</div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Main Hall</span>
                    <span className="font-medium text-error">86%</span>
                  </div>
                  <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                    <div className="bg-error h-full rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Royal Marquee</span>
                    <span className="font-medium text-warning">64%</span>
                  </div>
                  <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                    <div className="bg-warning h-full rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Outdoor Lawn</span>
                    <span className="font-medium text-success">32%</span>
                  </div>
                  <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                    <div className="bg-success h-full rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESOURCE SUMMARY */}
        <div className="col-span-1 lg:col-span-2 space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <Users className="w-5 h-5 text-tertiary" /> Resource Summary
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/app/inventory', { state: { fromBusiness: true } })}>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Inventory Value</div>
              <div className="text-xl font-currency-num font-bold text-on-surface">PKR 2.4M</div>
              <div className="text-sm font-medium text-primary mt-3 flex items-center gap-1">Manage Inventory <ArrowRight className="w-3 h-3" /></div>
            </div>
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/app/vendors', { state: { fromBusiness: true } })}>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Vendor Payables</div>
              <div className="text-xl font-currency-num font-bold text-on-surface">PKR 850,000</div>
              <div className="text-sm font-medium text-primary mt-3 flex items-center gap-1">Manage Vendors <ArrowRight className="w-3 h-3" /></div>
            </div>
            <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/app/staff', { state: { fromBusiness: true } })}>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Monthly Staff Cost</div>
              <div className="text-xl font-currency-num font-bold text-on-surface">PKR 1.2M</div>
              <div className="text-sm font-medium text-primary mt-3 flex items-center gap-1">Manage Staff <ArrowRight className="w-3 h-3" /></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
