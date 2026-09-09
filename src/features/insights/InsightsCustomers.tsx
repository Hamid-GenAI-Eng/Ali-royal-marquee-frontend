import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';

export const InsightsCustomers = () => {
  const data = [
    { name: 'One-time', value: 75, color: '#94a3b8' },
    { name: 'Repeat', value: 20, color: '#a78b5a' },
    { name: 'Corporate', value: 5, color: '#3b82f6' },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Customer Insights"
        category="Insights"
        icon="group"
        description="Customer demographics, loyalty metrics, and acquisition channels."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Customer LTV (Avg)</div>
          <div className="text-3xl font-currency-num font-bold text-on-surface">PKR 1.2M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Repeat Rate</div>
          <div className="text-3xl font-bold text-success">25%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
          <h3 className="font-title-lg mb-6">Customer Segments</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value" stroke="none">
                  {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} formatter={(value) => `${value}%`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
          <h3 className="font-title-lg mb-6">Acquisition Channels</h3>
          <ul className="space-y-4">
            <li>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium">Word of Mouth</span><span>45%</span></div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden"><div className="bg-primary h-full rounded-full" style={{width: '45%'}}></div></div>
            </li>
            <li>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium">Instagram</span><span>30%</span></div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden"><div className="bg-primary h-full rounded-full" style={{width: '30%'}}></div></div>
            </li>
            <li>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium">Walk-in</span><span>15%</span></div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden"><div className="bg-primary h-full rounded-full" style={{width: '15%'}}></div></div>
            </li>
            <li>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium">Website</span><span>10%</span></div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden"><div className="bg-primary h-full rounded-full" style={{width: '10%'}}></div></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
