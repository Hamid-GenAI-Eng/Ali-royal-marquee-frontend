import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

export const InsightsOperations = () => {
  const data = [
    { name: 'Menu 1', Wastage: 15 },
    { name: 'Menu 2', Wastage: 8 },
    { name: 'Menu 3', Wastage: 12 },
    { name: 'Menu 4', Wastage: 5 },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Operations & Logistics"
        category="Insights"
        icon="local_shipping"
        description="Wastage tracking, staffing efficiency, and vendor SLA performance."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg Food Wastage</div>
          <div className="text-3xl font-bold text-warning">12%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Staff Utilization</div>
          <div className="text-3xl font-bold text-success">88%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">On-Time Vendor Delivery</div>
          <div className="text-3xl font-bold text-primary">94%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Utility Cost / Event</div>
          <div className="text-3xl font-currency-num font-bold text-error">PKR 15,000</div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
        <h3 className="font-title-lg mb-6">Wastage by Menu Type</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={v => `${v}%`} />
              <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
              <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="Wastage" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
