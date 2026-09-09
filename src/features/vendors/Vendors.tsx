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
import type { Vendor } from '../../types';

export const Vendors = () => {
  const { vendors } = useMockData();
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.state?.fromBusiness;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  
  // Sort state
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter state
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  const handleSort = (colKey: string) => {
    if (sortColumn === colKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colKey);
      setSortDirection('asc');
    }
  };

  const filteredData = useMemo(() => {
    let result = vendors;
    
    if (statusFilter !== 'All') {
      result = result.filter(v => v.status === statusFilter);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(lowerSearch) ||
        v.category.toLowerCase().includes(lowerSearch) ||
        v.contactName.toLowerCase().includes(lowerSearch)
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
  }, [searchTerm, statusFilter, sortColumn, sortDirection]);

  const columns: ColumnDef<Vendor>[] = [
    {
      key: 'name',
      header: 'Vendor Name',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-on-surface">{item.name}</div>
          <div className="text-[12px] text-on-surface-variant font-medium mt-0.5">{item.id}</div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category / Service',
      sortable: true,
      render: (item) => (
        <span className="text-on-surface-variant font-medium">{item.category}</span>
      )
    },
    {
      key: 'contactName',
      header: 'Primary Contact',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-medium text-on-surface">{item.contactName}</div>
          <div className="text-[12px] text-on-surface-variant flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[12px]">phone</span> {item.phone}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'right',
      render: (item) => (
        <Badge variant={item.status === 'Active' ? 'success' : 'neutral'}>{item.status}</Badge>
      )
    }
  ];

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Vendors & Suppliers Management"
        category="Commercial & Procurement Ledger"
        icon="corporate_fare"
        description="Manage authorized suppliers, service contractors, active purchase commitments, commercial payables, and performance audit records."
        onBack={showBack ? () => navigate(-1) : undefined}
        actions={
          <>
            <Button variant="outline" icon="tune">Filters</Button>
            <Button variant="primary" icon="add_business" onClick={() => navigate('/app/vendors/new')}>Add Vendor</Button>
          </>
        }
      />

      <div className="flex flex-col w-full space-y-6">
        {/* KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm border border-surface-variant/70 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Registered Vendors</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">corporate_fare</span>
            </div>
            <div className="mt-3">
              <div className="font-currency-num text-2xl text-on-surface font-bold tracking-tight">86</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm border border-surface-variant/70 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Active Contractors</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">handshake</span>
            </div>
            <div className="mt-3">
              <div className="font-currency-num text-2xl text-on-surface font-bold tracking-tight">72</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm border border-surface-variant/70 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Outstanding Payables</span>
              <span className="material-symbols-outlined text-error text-[20px]">pending_actions</span>
            </div>
            <div className="mt-3">
              <div className="font-currency-num text-2xl text-on-surface font-bold tracking-tight">PKR 1.24M</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm border border-surface-variant/70 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-fixed-dim"></div>
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Purchases (Month)</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">receipt_long</span>
            </div>
            <div className="mt-3">
              <div className="font-currency-num text-2xl text-on-surface font-bold tracking-tight">PKR 845k</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm border border-surface-variant/70 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Top-Tier Partner</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
            </div>
            <div className="mt-3">
              <div className="font-title-md text-title-md text-primary font-bold truncate">Royal Foods Pvt Ltd</div>
            </div>
          </div>
        </div>

        {/* Operational Alert Banner */}
        <div className="rounded-xl p-5 bg-gradient-to-r from-primary-fixed/20 via-surface-container-low to-surface-container-lowest border border-outline-variant/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">notification_important</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-title-sm text-title-sm text-primary font-bold">Attention Required: Pending Vendor Payables</span>
                <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider">Urgent Action</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                3 vendor disbursements totaling <strong className="text-primary font-semibold">PKR 185,000</strong> are pending clearance before tonight's event.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            <Button variant="primary">Clear Pending Payables</Button>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-surface-container-lowest p-3 rounded shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Button 
              variant={statusFilter === 'All' ? 'primary' : 'text'} 
              className={statusFilter === 'All' ? 'py-1.5 px-3' : 'py-1.5 px-3 text-on-surface-variant'} 
              onClick={() => setStatusFilter('All')}
            >
              All Vendors
            </Button>
            <Button 
              variant={statusFilter === 'Active' ? 'primary' : 'text'} 
              className={statusFilter === 'Active' ? 'py-1.5 px-3' : 'py-1.5 px-3 text-on-surface-variant'} 
              onClick={() => setStatusFilter('Active')}
            >
              Active
            </Button>
            <Button 
              variant={statusFilter === 'Inactive' ? 'primary' : 'text'} 
              className={statusFilter === 'Inactive' ? 'py-1.5 px-3' : 'py-1.5 px-3 text-on-surface-variant'} 
              onClick={() => setStatusFilter('Inactive')}
            >
              Inactive
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <SearchInput 
              placeholder="Search vendor name, category..." 
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
          onRowClick={(item) => setSelectedVendor(item)}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          currentPage={1}
          totalPages={1}
          totalItems={filteredData.length}
        />
      </div>

      <Drawer
        isOpen={!!selectedVendor}
        onClose={() => setSelectedVendor(null)}
        title={selectedVendor?.name || ''}
        subtitle={selectedVendor ? `Vendor ID: ${selectedVendor.id} | Category: ${selectedVendor.category}` : ''}
        width="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSelectedVendor(null)}>Close</Button>
            <Button variant="primary" onClick={() => {
              navigate(`/app/vendors/${selectedVendor?.id}`);
              setSelectedVendor(null);
            }}>Manage Vendor</Button>
          </div>
        }
      >
        {selectedVendor && (
          <div className="space-y-6">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <h3 className="font-title-md mb-3 flex items-center justify-between">
                <span>Contact Profile</span>
                <Badge variant={selectedVendor.status === 'Active' ? 'success' : 'neutral'}>{selectedVendor.status}</Badge>
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-body-sm">
                <div>
                  <span className="text-on-surface-variant block mb-0.5">Primary Contact</span>
                  <span className="font-semibold text-on-surface">{selectedVendor.contactName}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block mb-0.5">Phone</span>
                  <span className="font-semibold text-on-surface">{selectedVendor.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-4 rounded-lg border border-surface-container-highest">
              <h3 className="font-title-md mb-3 text-on-surface">Financial Standing</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">No outstanding payables currently registered for this vendor.</p>
              <Button variant="outline" className="w-full">View Ledger History</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Vendors;
