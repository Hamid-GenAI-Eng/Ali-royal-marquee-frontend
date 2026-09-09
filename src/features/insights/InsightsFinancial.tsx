import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

export const InsightsFinancial = () => {
  const data = [
    { name: 'Jan', Margin: 25 },
    { name: 'Feb', Margin: 28 },
    { name: 'Mar', Margin: 30 },
    { name: 'Apr', Margin: 29 },
    { name: 'May', Margin: 32 },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Financial Health"
        category="Insights"
        icon="account_balance"
        description="Profit margins, cost breakdown, and ROI analysis."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Net Profit Margin</div>
          <div className="text-3xl font-bold text-success">31.4%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg Cost / Guest</div>
          <div className="text-3xl font-currency-num font-bold text-on-surface">PKR 850</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg Revenue / Guest</div>
          <div className="text-3xl font-currency-num font-bold text-on-surface">PKR 1,240</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Customer Acquisition Cost</div>
          <div className="text-3xl font-currency-num font-bold text-error">PKR 15,400</div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
        <h3 className="font-title-lg mb-6">Profit Margin Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={v => `${v}%`} />
              <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
              <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Area type="monotone" dataKey="Margin" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorMargin)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
