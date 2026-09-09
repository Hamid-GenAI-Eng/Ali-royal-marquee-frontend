import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';

export const BusinessPackages = () => {
  const navigate = useNavigate();

  const packageData = [
    { name: 'Royal Gold', value: 45, color: '#a78b5a' },
    { name: 'Silver Premium', value: 30, color: '#94a3b8' },
    { name: 'Classic Bronze', value: 15, color: '#b45309' },
    { name: 'Customized', value: 10, color: '#3b82f6' },
  ];

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Business Packages"
        category="Product & Pricing"
        icon="restaurant_menu"
        description="Overview of package performance, popularity, and revenue generation."
        actions={
          <Button variant="primary" icon="edit" onClick={() => navigate('/app/packages', { state: { fromBusiness: true } })}>Manage Packages</Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Active Packages</div>
          <div className="text-3xl font-bold text-on-surface">8</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Most Popular</div>
          <div className="text-xl font-bold text-primary mt-2">Royal Gold</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Highest Margin</div>
          <div className="text-xl font-bold text-success mt-2">Silver Premium</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Custom Add-on Revenue</div>
          <div className="text-3xl font-currency-num font-bold text-on-surface">PKR 1.2M</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm col-span-1">
          <h3 className="font-title-lg mb-6">Package Usage (Last 6 Months)</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {packageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} formatter={(value) => `${value}%`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-surface rounded-xl border border-outline-variant/40 p-6 shadow-sm col-span-2">
          <h3 className="font-title-lg mb-4">Top Performing Packages</h3>
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-variant/30 text-on-surface-variant text-sm">
              <tr>
                <th className="p-4 font-medium rounded-tl-lg">Package Name</th>
                <th className="p-4 font-medium">Bookings</th>
                <th className="p-4 font-medium">Revenue Share</th>
                <th className="p-4 font-medium text-right rounded-tr-lg">Avg Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              <tr>
                <td className="p-4 font-medium">Royal Gold</td>
                <td className="p-4">124</td>
                <td className="p-4"><Badge variant="primary">45%</Badge></td>
                <td className="p-4 text-right font-medium text-success">32%</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Silver Premium</td>
                <td className="p-4">86</td>
                <td className="p-4"><Badge variant="neutral">30%</Badge></td>
                <td className="p-4 text-right font-medium text-success">38%</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Classic Bronze</td>
                <td className="p-4">42</td>
                <td className="p-4"><Badge variant="warning">15%</Badge></td>
                <td className="p-4 text-right font-medium text-success">25%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
