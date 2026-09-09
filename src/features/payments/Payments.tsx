import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { DataGrid } from '../../components/ui/DataGrid';
import type { ColumnDef } from '../../components/ui/DataGrid';
import { Badge } from '../../components/ui/Badge';
import { useMockData } from '../../context/MockDataContext';
import type { Payment } from '../../types';

export const Payments = () => {
  const { payments, customers } = useMockData();
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.state?.fromBusiness;

  const [searchTerm, setSearchTerm] = useState('');
  
  // Sort state
  const [sortColumn, setSortColumn] = useState('dateStr');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (colKey: string) => {
    if (sortColumn === colKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colKey);
      setSortDirection('asc');
    }
  };

  const getCustomer = (id: string) => customers.find(c => c.id === id);


  const filteredData = useMemo(() => {
    let result = payments;
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => {
        const c = getCustomer(p.customerId);
        return (
          p.id.toLowerCase().includes(lowerSearch) ||
          p.reference.toLowerCase().includes(lowerSearch) ||
          c?.name.toLowerCase().includes(lowerSearch) ||
          p.bookingId.toLowerCase().includes(lowerSearch)
        );
      });
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
  }, [searchTerm, sortColumn, sortDirection]);

  const columns: ColumnDef<Payment>[] = [
    {
      key: 'dateStr',
      header: 'Date',
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-on-surface-variant">{item.dateStr}</span>
      )
    },
    {
      key: 'id',
      header: 'Voucher ID',
      sortable: true,
      render: (item) => <span className="font-semibold text-primary">{item.id}</span>
    },
    {
      key: 'customer',
      header: 'Client & Booking',
      render: (item) => {
        const c = getCustomer(item.customerId);
        return (
          <div>
            <div className="font-semibold text-on-surface">{c?.name || 'Unknown'}</div>
            <div className="text-[12px] text-on-surface-variant font-medium mt-0.5">{item.bookingId}</div>
          </div>
        );
      }
    },
    {
      key: 'method',
      header: 'Method',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
          <span className="material-symbols-outlined text-[16px]">
            {item.method === 'Bank Transfer' ? 'account_balance' : item.method === 'Cash' ? 'payments' : 'credit_card'}
          </span>
          {item.method}
        </div>
      )
    },
    {
      key: 'reference',
      header: 'Reference',
      render: (item) => (
        <span className="text-[12px] bg-surface-container-low px-2 py-1 rounded font-mono">{item.reference || 'N/A'}</span>
      )
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right',
      render: (item) => (
        <span className="font-currency-num font-bold text-primary">PKR {item.amount.toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'right',
      render: (item) => {
        let variant: any = 'neutral';
        if (item.status === 'Completed') variant = 'success';
        if (item.status === 'Pending') variant = 'warning';
        if (item.status === 'Failed') variant = 'error';
        return <Badge variant={variant}>{item.status}</Badge>;
      }
    }
  ];

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Payments & Commercial Settlements"
        category="Commercial & Financial Settlements"
        icon="account_balance_wallet"
        description="Monitor revenue collections, scheduled milestone receivables, multi-channel gateways, and daily accounts reconciliation."
        onBack={showBack ? () => navigate(-1) : undefined}
        actions={
          <>
            <Button variant="outline" icon="download">Export Ledger</Button>
            <Button variant="primary" icon="add" onClick={() => navigate('/app/payments/new')}>Record Payment</Button>
          </>
        }
      />

      <div className="flex flex-col w-full space-y-6">
        {/* KPI Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Total Collected</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">account_balance_wallet</span>
            </div>
            <div className="mt-3 font-headline-sm text-headline-sm text-primary font-bold">PKR 8.42M</div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Outstanding</span>
              <span className="material-symbols-outlined text-[18px] text-primary-container">pending_actions</span>
            </div>
            <div className="mt-3 font-headline-sm text-headline-sm text-on-surface font-bold">PKR 2.48M</div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-semibold">Overdue</span>
              <span className="material-symbols-outlined text-[18px] text-error">warning</span>
            </div>
            <div className="mt-3 font-headline-sm text-headline-sm text-error font-bold">PKR 640k</div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-fixed-dim"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Due This Week</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">calendar_clock</span>
            </div>
            <div className="mt-3 font-headline-sm text-headline-sm text-on-surface font-bold">PKR 920k</div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden col-span-2 md:col-span-1">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-on-surface-variant"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Refunds</span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">receipt_long</span>
            </div>
            <div className="mt-3 font-headline-sm text-headline-sm text-on-surface font-bold">PKR 85k</div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-surface-container-lowest p-3 rounded shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SearchInput 
              placeholder="Search by voucher, client, or booking..." 
              value={searchTerm} 
              onChange={setSearchTerm} 
            />
            <Button variant="outline" icon="filter_list">More Filters</Button>
          </div>
        </div>

        {/* DATA GRID */}
        <DataGrid 
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => navigate(`/app/payments/${item.id}`)}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          currentPage={1}
          totalPages={1}
          totalItems={filteredData.length}
        />
      </div>
    </div>
  );
};

export default Payments;
