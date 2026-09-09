// import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import { useMockData } from '../../context/MockDataContext';

export const InsightsOverview = () => {
  const { } = useMockData();

  const data = [
    { name: 'Jan', revenue: 4000000, bookings: 24, expenses: 2400000 },
    { name: 'Feb', revenue: 3000000, bookings: 13, expenses: 1398000 },
    { name: 'Mar', revenue: 2000000, bookings: 98, expenses: 9800000 },
    { name: 'Apr', revenue: 2780000, bookings: 39, expenses: 3908000 },
    { name: 'May', revenue: 1890000, bookings: 48, expenses: 4800000 },
    { name: 'Jun', revenue: 2390000, bookings: 38, expenses: 3800000 },
    { name: 'Jul', revenue: 3490000, bookings: 43, expenses: 4300000 },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Insights Overview"
        category="Analytics & Intelligence"
        icon="insights"
        description="High-level metrics and trends across all business operations."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider">Total Revenue</div>
            <div className="p-1.5 bg-primary-container text-on-primary-container rounded-md"><DollarSign className="w-4 h-4"/></div>
          </div>
          <div className="text-2xl font-currency-num font-bold text-on-surface">PKR 19.5M</div>
          <div className="text-xs text-success flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +14.2% vs last month</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider">Bookings</div>
            <div className="p-1.5 bg-secondary-container text-on-secondary-container rounded-md"><Calendar className="w-4 h-4"/></div>
          </div>
          <div className="text-2xl font-bold text-on-surface">303</div>
          <div className="text-xs text-success flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +5.1% vs last month</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider">Conversion Rate</div>
            <div className="p-1.5 bg-tertiary-container text-on-tertiary-container rounded-md"><ArrowUpRight className="w-4 h-4"/></div>
          </div>
          <div className="text-2xl font-bold text-on-surface">42.8%</div>
          <div className="text-xs text-error flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1 transform rotate-180" /> -2.4% vs last month</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider">New Customers</div>
            <div className="p-1.5 bg-primary/10 text-primary rounded-md"><Users className="w-4 h-4"/></div>
          </div>
          <div className="text-2xl font-bold text-on-surface">184</div>
          <div className="text-xs text-success flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +8.1% vs last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm col-span-1 lg:col-span-2">
          <h3 className="font-title-lg mb-6">Revenue & Expenses Trend</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78b5a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a78b5a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={(value) => `${value/1000000}M`} />
                <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                <Area type="monotone" dataKey="revenue" stroke="#a78b5a" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm col-span-1">
          <h3 className="font-title-lg mb-6">Bookings by Hall</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Jan', Main: 12, Royal: 8, Outdoor: 4 },
                { name: 'Feb', Main: 15, Royal: 10, Outdoor: 5 },
                { name: 'Mar', Main: 18, Royal: 12, Outdoor: 8 },
                { name: 'Apr', Main: 14, Royal: 9, Outdoor: 15 },
              ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                <CartesianGrid vertical={false} stroke="#e4e4e7" strokeDasharray="3 3" />
                <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                <Bar dataKey="Main" stackId="a" fill="#a78b5a" name="Main Hall" />
                <Bar dataKey="Royal" stackId="a" fill="#3b82f6" name="Royal Marquee" />
                <Bar dataKey="Outdoor" stackId="a" fill="#10b981" name="Outdoor Lawn" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
