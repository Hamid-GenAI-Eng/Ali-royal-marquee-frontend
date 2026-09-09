import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, CartesianGrid } from 'recharts';

export const InsightsForecast = () => {
  const data = [
    { name: 'Current', Actual: 3800000, Projected: 3800000 },
    { name: 'Month +1', Actual: 0, Projected: 4200000 },
    { name: 'Month +2', Actual: 0, Projected: 4500000 },
    { name: 'Month +3', Actual: 0, Projected: 4100000 },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Predictive Forecasts"
        category="Insights"
        icon="online_prediction"
        description="AI-driven projections for revenue, demand, and resource requirements."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Q4 Projected Revenue</div>
          <div className="text-3xl font-currency-num font-bold text-on-surface">PKR 12.8M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Expected Demand Surge</div>
          <div className="text-3xl font-bold text-primary">Mid-Nov</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm border-error/50 bg-error/5">
          <div className="text-xs text-error uppercase tracking-wider mb-1 font-semibold">Predicted Shortfall</div>
          <div className="text-xl font-bold text-error">Staffing Gap in Dec</div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
        <h3 className="font-title-lg mb-6">Revenue Forecast</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={(value) => `${value/1000000}M`} />
              <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
              <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{fontSize: '12px'}} />
              <Bar dataKey="Actual" fill="#a78b5a" name="Actual Booked" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="Projected" stroke="#94a3b8" strokeWidth={3} strokeDasharray="5 5" name="Projected based on current trend data" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
