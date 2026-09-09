import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { DataGrid } from '../../components/ui/DataGrid';
import type { ColumnDef } from '../../components/ui/DataGrid';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { useMockData } from '../../context/MockDataContext';
import type { Staff as StaffType } from '../../types';

export const Staff = () => {
  const { staff } = useMockData();
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = (location.state as any)?.fromBusiness;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<StaffType | null>(null);
  
  // Sort state
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter state
  const [shiftFilter, setShiftFilter] = useState<'All' | 'Morning' | 'Evening' | 'Night'>('All');

  const handleSort = (colKey: string) => {
    if (sortColumn === colKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colKey);
      setSortDirection('asc');
    }
  };

  const filteredData = useMemo(() => {
    let result = staff;
    
    if (shiftFilter !== 'All') {
      result = result.filter(s => s.shift === shiftFilter);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(lowerSearch) ||
        s.role.toLowerCase().includes(lowerSearch) ||
        s.phone.includes(lowerSearch)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      const valA = (a as any)[sortColumn];
      const valB = (b as any)[sortColumn];
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchTerm, shiftFilter, sortColumn, sortDirection, staff]);

  const columns: ColumnDef<StaffType>[] = [
    {
      key: 'name',
      header: 'Staff Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center shrink-0">
            {item.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-on-surface">{item.name}</div>
            <div className="text-[12px] text-on-surface-variant mt-0.5">{item.id}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role / Wing',
      sortable: true,
      render: (item) => (
        <span className="font-medium text-on-surface-variant">{item.role}</span>
      )
    },
    {
      key: 'shift',
      header: 'Shift',
      sortable: true,
      render: (item) => (
        <span className="text-[13px] text-on-surface bg-surface-container px-2 py-1 rounded">{item.shift}</span>
      )
    },
    {
      key: 'phone',
      header: 'Contact',
      render: (item) => (
        <span className="text-[13px] text-on-surface font-medium">{item.phone}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'right',
      render: (item) => {
        let variant: any = 'neutral';
        if (item.status === 'Active') variant = 'success';
        if (item.status === 'On Leave') variant = 'warning';
        if (item.status === 'Inactive') variant = 'error';
        return <Badge variant={variant}>{item.status}</Badge>;
      }
    }
  ];

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Human Resources & Staffing"
        category="Operations & Administration"
        icon="badge"
        description="Manage venue management personnel, operational teams, scheduling, payroll, and event assignments."
        onBack={showBack ? () => navigate(-1) : undefined}
        actions={
          <>
            <Button variant="outline" icon="print">Export Payroll</Button>
            <Button variant="primary" icon="person_add" onClick={() => navigate('/app/staff/new')}>Add Employee</Button>
          </>
        }
      />

      <div className="flex flex-col w-full space-y-6">
        {/* KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative bg-surface-container-lowest p-5 rounded shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Total Staff</span>
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">groups</span>
              </div>
            </div>
            <div className="font-headline-lg text-headline-lg text-primary tracking-tight">48</div>
          </div>
          <div className="relative bg-surface-container-lowest p-5 rounded shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Active Roster</span>
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
            </div>
            <div className="font-headline-lg text-headline-lg text-primary tracking-tight">42</div>
          </div>
          <div className="relative bg-surface-container-lowest p-5 rounded shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-fixed-dim"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Available Today</span>
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              </div>
            </div>
            <div className="font-headline-lg text-headline-lg text-primary tracking-tight">31</div>
          </div>
          <div className="relative bg-surface-container-lowest p-5 rounded shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Assigned to Events</span>
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[18px]">event_seat</span>
              </div>
            </div>
            <div className="font-headline-lg text-headline-lg text-primary tracking-tight">18</div>
          </div>
          <div className="relative bg-surface-container-lowest p-5 rounded shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Attendance</span>
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
              </div>
            </div>
            <div className="font-headline-lg text-headline-lg text-primary tracking-tight">91.7%</div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded p-6 shadow-sm">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary-container"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-primary-fixed/30 text-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">notification_important</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-primary-container text-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    Critical Roster Alert
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Event EV-2042</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  Staffing Shortage: Tonight's Ahsan Malik Walima Gala (EV-2042)
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
                  2 VIP banquet service steward positions remain unassigned.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="primary" icon="assignment_ind">Assign Waitstaff Now (2 Short)</Button>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-surface-container-lowest p-3 rounded shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Button 
              variant={shiftFilter === 'All' ? 'primary' : 'text'} 
              className={shiftFilter === 'All' ? 'py-1.5 px-3' : 'py-1.5 px-3 text-on-surface-variant'} 
              onClick={() => setShiftFilter('All')}
            >
              All Shifts
            </Button>
            <Button 
              variant={shiftFilter === 'Morning' ? 'primary' : 'text'} 
              className={shiftFilter === 'Morning' ? 'py-1.5 px-3' : 'py-1.5 px-3 text-on-surface-variant'} 
              onClick={() => setShiftFilter('Morning')}
            >
              Morning
            </Button>
            <Button 
              variant={shiftFilter === 'Evening' ? 'primary' : 'text'} 
              className={shiftFilter === 'Evening' ? 'py-1.5 px-3' : 'py-1.5 px-3 text-on-surface-variant'} 
              onClick={() => setShiftFilter('Evening')}
            >
              Evening
            </Button>
            <Button 
              variant={shiftFilter === 'Night' ? 'primary' : 'text'} 
              className={shiftFilter === 'Night' ? 'py-1.5 px-3' : 'py-1.5 px-3 text-on-surface-variant'} 
              onClick={() => setShiftFilter('Night')}
            >
              Night
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <SearchInput 
              placeholder="Search staff members..." 
              value={searchTerm} 
              onChange={setSearchTerm} 
            />
          </div>
        </div>

        {/* DATA GRID */}
        <DataGrid 
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => setSelectedStaff(item)}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          currentPage={1}
          totalPages={1}
          totalItems={filteredData.length}
        />
      </div>

      <Drawer
        isOpen={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
        title={selectedStaff?.name || ''}
        subtitle={selectedStaff ? `Employee ID: ${selectedStaff.id} | Role: ${selectedStaff.role}` : ''}
        width="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSelectedStaff(null)}>Close</Button>
            <Button variant="primary" onClick={() => {
              setSelectedStaff(null);
              navigate(`/app/staff/${selectedStaff?.id}`);
            }}>Manage Profile</Button>
          </div>
        }
      >
        {selectedStaff && (
          <div className="space-y-6">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <h3 className="font-title-md mb-3 flex items-center justify-between">
                <span>Employee Overview</span>
                <Badge variant={selectedStaff.status === 'Active' ? 'success' : selectedStaff.status === 'On Leave' ? 'warning' : 'error'}>{selectedStaff.status}</Badge>
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-body-sm">
                <div>
                  <span className="text-on-surface-variant block mb-0.5">Primary Contact</span>
                  <span className="font-semibold text-on-surface">{selectedStaff.phone}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block mb-0.5">Assigned Shift</span>
                  <span className="font-semibold text-on-surface bg-surface-container-high px-2 py-0.5 rounded">{selectedStaff.shift}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-4 rounded-lg border border-surface-container-highest text-center">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-2 block">event_note</span>
              <h3 className="font-title-md mb-2 text-on-surface">Weekly Attendance</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">Attendance records are up to date for this week.</p>
              <Button variant="outline">View Timesheet</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Staff;
