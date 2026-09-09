// import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, CartesianGrid } from 'recharts';

export const InsightsBookings = () => {
  const data = [
    { name: 'Jan', Confirmed: 20, Cancelled: 2, Enquiries: 45 },
    { name: 'Feb', Confirmed: 25, Cancelled: 1, Enquiries: 50 },
    { name: 'Mar', Confirmed: 35, Cancelled: 3, Enquiries: 80 },
    { name: 'Apr', Confirmed: 40, Cancelled: 1, Enquiries: 90 },
    { name: 'May', Confirmed: 22, Cancelled: 4, Enquiries: 60 },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Bookings Analytics"
        category="Insights"
        icon="event_note"
        description="Booking trends, cancellation rates, and pipeline conversion."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg Lead Time</div>
          <div className="text-3xl font-bold text-on-surface">45 Days</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Cancellation Rate</div>
          <div className="text-3xl font-bold text-success">3.2%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg Guest Count</div>
          <div className="text-3xl font-bold text-on-surface">320</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Peak Month</div>
          <div className="text-3xl font-bold text-primary">November</div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm">
        <h3 className="font-title-lg mb-6">Booking Pipeline Trends</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
              <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
              <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              <Line type="monotone" dataKey="Enquiries" stroke="#94a3b8" strokeWidth={2} dot={{r: 4}} />
              <Line type="monotone" dataKey="Confirmed" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
              <Line type="monotone" dataKey="Cancelled" stroke="#f87171" strokeWidth={2} dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
