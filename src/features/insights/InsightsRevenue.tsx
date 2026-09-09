import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useMockData } from '../../context/MockDataContext';

export const InsightsRevenue = () => {
  const { bookings } = useMockData();
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  const data = [
    { name: 'Q1', Packages: 4000000, Addons: 2400000, Services: 1200000 },
    { name: 'Q2', Packages: 3000000, Addons: 1398000, Services: 900000 },
    { name: 'Q3', Packages: 5000000, Addons: 3800000, Services: 1500000 },
    { name: 'Q4', Packages: 4780000, Addons: 3908000, Services: 1800000 },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Revenue Analytics"
        category="Insights"
        icon="trending_up"
        description="Deep dive into revenue streams, payment methods, and historical comparisons."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Revenue</div>
          <div className="text-2xl font-currency-num font-bold text-on-surface">PKR {(totalRevenue / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Package Revenue</div>
          <div className="text-2xl font-currency-num font-bold text-on-surface">PKR {(totalRevenue * 0.5 / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Add-ons Revenue</div>
          <div className="text-2xl font-currency-num font-bold text-on-surface">PKR {(totalRevenue * 0.35 / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">YoY Growth</div>
          <div className="text-2xl font-bold text-success flex items-center gap-2"><TrendingUp className="w-5 h-5"/> 18.2%</div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
        <h3 className="font-title-lg mb-6">Revenue by Stream (Quarterly)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={(value) => `${value/1000000}M`} />
              <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
              <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              <Bar dataKey="Packages" fill="#a78b5a" />
              <Bar dataKey="Addons" fill="#94a3b8" />
              <Bar dataKey="Services" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
