import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { TrendingUp, DollarSign } from 'lucide-react';
import { useMockData } from '../../context/MockDataContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, LineChart, Line } from 'recharts';

export const BusinessFinances = () => {
  const navigate = useNavigate();
  const { bookings, expenses, payments } = useMockData();

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const receivables = totalRevenue - totalPaid;

  const monthlyData = [
    { month: 'Jan', revenue: 4200000, expenses: 1800000, profit: 2400000 },
    { month: 'Feb', revenue: 3800000, expenses: 1900000, profit: 1900000 },
    { month: 'Mar', revenue: 5100000, expenses: 2200000, profit: 2900000 },
    { month: 'Apr', revenue: 4800000, expenses: 2000000, profit: 2800000 },
    { month: 'May', revenue: 5900000, expenses: 2400000, profit: 3500000 },
    { month: 'Jun', revenue: 6200000, expenses: 2500000, profit: 3700000 },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Business Financials"
        category="Finance & Profitability"
        icon="account_balance"
        description="Comprehensive view of revenue, expenses, profit margins, and cash flow."
        actions={
          <>
            <Button variant="outline" onClick={() => navigate('/app/reports')}>View Full Reports</Button>
            <Button variant="primary" icon="payments" onClick={() => navigate('/app/payments', { state: { fromBusiness: true } })}>Manage Payments</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Revenue (YTD)</div>
          <div className="text-2xl font-currency-num font-bold text-on-surface">PKR {(totalRevenue/1000000).toFixed(2)}M</div>
          <div className="text-xs text-success flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +12.5%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Expenses</div>
          <div className="text-2xl font-currency-num font-bold text-on-surface">PKR {(totalExpenses/1000000).toFixed(2)}M</div>
          <div className="text-xs text-error flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +4.2%</div>
        </div>
        <div className="bg-primary-container text-on-primary-container border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wider mb-1 opacity-80">Net Profit</div>
          <div className="text-2xl font-currency-num font-bold">PKR {(netProfit/1000000).toFixed(2)}M</div>
          <div className="text-xs flex items-center mt-2 opacity-90"><TrendingUp className="w-3 h-3 mr-1" /> +18.4%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Receivables</div>
          <div className="text-2xl font-currency-num font-bold text-error">PKR {(receivables/1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden hidden lg:block">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Payables</div>
          <div className="text-2xl font-currency-num font-bold text-warning">PKR 0.85M</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
          <h3 className="font-title-lg mb-6">Revenue vs Expense</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={(value) => `${value/1000000}M`} />
                <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '20px'}} />
                <Bar dataKey="revenue" name="Revenue" fill="#a78b5a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
          <h3 className="font-title-lg mb-6">Profit Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={(value) => `${value/1000000}M`} />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="profit" name="Net Profit" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
