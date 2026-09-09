import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useMockData } from '../../context/MockDataContext';

export const BusinessStaff = () => {
  const navigate = useNavigate();
  const { staff } = useMockData();

  return (
    <div className="w-full px-8 py-8 space-y-8">
      <PageHeader 
        title="Business Staff & Workforce"
        category="Human Resources"
        icon="badge"
        description="High-level workforce intelligence, labor costs, and operational readiness."
        actions={
          <Button variant="primary" icon="edit" onClick={() => navigate('/app/staff', { state: { fromBusiness: true } })}>Manage Staff</Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Workforce</div>
          <div className="text-3xl font-bold text-on-surface">{staff.length}</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-success"></div>
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Attendance Rate</div>
          <div className="text-3xl font-bold text-success">96%</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Monthly Labor Cost</div>
          <div className="text-3xl font-currency-num font-bold text-on-surface">PKR 1.2M</div>
        </div>
        <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
          <div className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Staffing Gaps</div>
          <div className="text-3xl font-bold text-error">2</div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl border border-outline-variant/40 p-8 shadow-sm text-center max-w-2xl mx-auto mt-8">
        <h3 className="text-xl font-bold mb-4">Operational Workforce Management</h3>
        <p className="text-on-surface-variant mb-6">
          To process payroll, manage schedules, approve leave requests, and assign staff to specific events, please use the main Staff workspace.
        </p>
        <Button variant="primary" onClick={() => navigate('/app/staff', { state: { fromBusiness: true } })}>Go to Staff Workspace</Button>
      </div>
    </div>
  );
};
