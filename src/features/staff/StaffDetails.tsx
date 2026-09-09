import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Phone, Badge as BadgeIcon, Clock, Calendar, CheckCircle2, DollarSign } from 'lucide-react';
import clsx from 'clsx';

type TabType = 'overview' | 'schedule' | 'events' | 'attendance' | 'leave' | 'payroll' | 'performance';

export const StaffDetails = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const navigate = useNavigate();
  const { staff } = useMockData();

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const employee = staff.find((s) => s.id === staffId);

  if (!employee) {
    return <div className="p-8 text-center text-on-surface-variant">Staff member not found.</div>;
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Employee Overview' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'events', label: 'Event Assignments' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'payroll', label: 'Payroll & Salary' },
    { id: 'leave', label: 'Leave' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      {/* HEADER SECTION */}
      <div className="border-b border-outline-variant/30 bg-surface px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <button onClick={() => navigate('/app/staff')} className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Staff Directory
          </button>
          <span>/</span>
          <span className="font-medium text-on-surface">{employee.id}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-secondary-container text-on-secondary-container font-headline-lg flex items-center justify-center rounded-full shrink-0">
              {employee.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-on-surface">{employee.name}</h1>
                <Badge variant={employee.status === 'Active' ? 'success' : 'neutral'} className="text-sm px-3 py-1">
                  {employee.status}
                </Badge>
              </div>
              <div className="flex items-center flex-wrap gap-4 text-on-surface-variant mt-2">
                <div className="flex items-center gap-1.5"><BadgeIcon className="w-4 h-4" /> {employee.role}</div>
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {employee.phone}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Button variant="primary" icon="edit">Edit Employee</Button>
              <Button variant="outline" icon="event_note">Assign Event</Button>
              <Button variant="outline" icon="money">Process Payroll</Button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="px-8 py-6 bg-surface-container-lowest border-b border-outline-variant/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Upcoming Events</div>
            <div className="text-3xl font-bold text-on-surface">3</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-success"></div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Attendance Rate</div>
            <div className="text-3xl font-bold text-success">98%</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Leave Balance</div>
            <div className="text-3xl font-bold text-warning">14 Days</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Base Salary</div>
              <div className="text-3xl font-currency-num font-bold text-primary flex items-center gap-2">PKR {(employee.salary || 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="px-8 border-b border-outline-variant/30 flex overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2",
              activeTab === tab.id 
                ? "border-primary text-primary" 
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h3 className="font-title-lg mb-4">Employment Details</h3>
                <div className="bg-surface rounded-xl border border-outline-variant/40 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Role/Position</div>
                    <div className="col-span-2 font-medium">{employee.role}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Join Date</div>
                    <div className="col-span-2 font-medium">15 Jan 2025</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Contact Number</div>
                    <div className="col-span-2 font-medium">{employee.phone}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 text-on-surface-variant text-sm">Emergency Contact</div>
                    <div className="col-span-2 font-medium">+92 300 0000000 (Brother)</div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="font-title-lg mb-4">Next Shift</h3>
                <div className="bg-surface rounded-xl border border-outline-variant/40 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Date</div>
                    <div className="col-span-2 font-medium">14 September 2026</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Timing</div>
                    <div className="col-span-2 font-medium">18:00 - 23:30 (Night Shift)</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Assignment</div>
                    <div className="col-span-2 font-medium text-primary">EV-2045 (Walima)</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Placeholders for others */}
        {['schedule', 'events', 'attendance', 'leave', 'payroll', 'performance'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <h3 className="text-xl font-medium text-on-surface mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Workspace</h3>
            <p>Ready for integration.</p>
          </div>
        )}
      </div>
    </div>
  );
};
