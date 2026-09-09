import { useState, useMemo } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { DataGrid } from '../../components/ui/DataGrid';
import type { ColumnDef } from '../../components/ui/DataGrid';
import { Drawer } from '../../components/ui/Drawer';
import { Badge } from '../../components/ui/Badge';
import { useMockData } from '../../context/MockDataContext';
import type {  Enquiry  } from '../../types';
import { useNavigate } from 'react-router-dom';

export const Enquiries = () => {
  const { enquiries, customers } = useMockData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  
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

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'Unknown';
  };
  const getCustomerPhone = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.phone || 'Unknown';
  };

  const filteredData = useMemo(() => {
    let result = enquiries;
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(enq => 
        enq.eventName.toLowerCase().includes(lowerSearch) ||
        getCustomerName(enq.customerId).toLowerCase().includes(lowerSearch) ||
        getCustomerPhone(enq.customerId).includes(searchTerm)
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
  }, [searchTerm, sortColumn, sortDirection]);

  const columns: ColumnDef<Enquiry>[] = [
    {
      key: 'id',
      header: 'Enquiry ID',
      sortable: true,
      render: (item) => <span className="font-semibold text-primary">{item.id}</span>
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (item) => (
        <div>
          <div className="font-semibold">{getCustomerName(item.customerId)}</div>
          <div className="text-on-surface-variant text-[12px]">{getCustomerPhone(item.customerId)}</div>
        </div>
      )
    },
    {
      key: 'eventName',
      header: 'Event',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-semibold text-on-surface">{item.eventName}</div>
          <div className="flex items-center gap-2 text-on-surface-variant text-[12px] mt-0.5">
            <span className="material-symbols-outlined text-[14px]">event</span>
            {item.dateStr}
          </div>
        </div>
      )
    },
    {
      key: 'guests',
      header: 'Pax',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => {
        let variant: any = 'neutral';
        if (item.status === 'New') variant = 'primary';
        if (item.status === 'Converted') variant = 'success';
        if (item.status === 'Lost') variant = 'error';
        if (item.status === 'Negotiating') variant = 'warning';
        return <Badge variant={variant}>{item.status}</Badge>;
      }
    },
    {
      key: 'assignedTo',
      header: 'Owner',
      sortable: true,
    }
  ];

  return (
    <div className="w-full px-8 py-8">
      <PageHeader 
        title="Enquiries Ledger"
        category="Hospitality Inbound Inquiries"
        icon="contact_mail"
        description="Manage prospective wedding parties, corporate galas, personalized walkthroughs, and banquet proposals."
        actions={
          <Button variant="primary" icon="add" onClick={() => navigate('/app/enquiries/new')}>
            New Enquiry
          </Button>
        }
      />

      <div className="flex flex-col w-full space-y-6">
        {/* SUMMARY KPI METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Total Enquiries</span>
            <div className="font-display text-[32px] leading-tight text-primary mt-1 font-bold">124</div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">New This Week</span>
            <div className="font-display text-[32px] leading-tight text-on-surface mt-1 font-bold">18</div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Follow-ups Due</span>
            <div className="font-display text-[32px] leading-tight text-error mt-1 font-bold">12</div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Hot Leads</span>
            <div className="font-display text-[32px] leading-tight text-primary-container mt-1 font-bold">9</div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Conversion Rate</span>
            <div className="font-display text-[32px] leading-tight text-on-surface mt-1 font-bold">32.4%</div>
          </div>
        </div>

        {/* WORKFLOW STAGE PIPELINE FUNNEL (Abbreviated for space, keeping visual) */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-headline-sm text-headline-sm text-primary">Inquiry Lifecycle</span>
            <div className="flex gap-1.5">
              <Button variant="primary" className="py-1 px-3 text-label-sm">All</Button>
              <Button variant="secondary" className="py-1 px-3 text-label-sm">Hot Leads</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
            {/* Mock funnel stages */}
            {['New', 'Contacted', 'Qualified', 'Scheduled', 'Quoted', 'Negotiating', 'Converted', 'Lost'].map((stage, i) => (
              <div key={stage} className="bg-surface-container-low p-3 rounded text-left border-t-2 border-secondary-fixed/50">
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">{i+1}. {stage}</div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1">{Math.floor(Math.random() * 20) + 5}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-between gap-4">
          <SearchInput 
            placeholder="Search enquiries..." 
            value={searchTerm} 
            onChange={setSearchTerm} 
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" icon="download">Export</Button>
            <Button variant="primary" icon="add" onClick={() => navigate('/app/enquiries/new')}>
              New Enquiry
            </Button>
          </div>
        </div>

        {/* DATA GRID */}
        <DataGrid 
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => navigate(`/app/enquiries/${item.id}`)}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          currentPage={1}
          totalPages={1}
          totalItems={filteredData.length}
        />
      </div>

      <Drawer
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        title={selectedEnquiry ? `Enquiry ${selectedEnquiry.id}` : ''}
        subtitle={selectedEnquiry ? getCustomerName(selectedEnquiry.customerId) : ''}
        width="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>Close</Button>
            <Button variant="primary">Edit Enquiry</Button>
          </div>
        }
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <h3 className="font-title-md mb-2">Event Details</h3>
              <div className="grid grid-cols-2 gap-4 text-body-sm">
                <div>
                  <span className="text-on-surface-variant block">Event Name</span>
                  <span className="font-semibold">{selectedEnquiry.eventName}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Preferred Date</span>
                  <span className="font-semibold">{selectedEnquiry.dateStr}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Expected Pax</span>
                  <span className="font-semibold">{selectedEnquiry.guests}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Current Status</span>
                  <Badge variant="primary" className="mt-1">{selectedEnquiry.status}</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-4 rounded-lg">
              <h3 className="font-title-md mb-2">Customer Info</h3>
              <div className="grid grid-cols-2 gap-4 text-body-sm">
                <div>
                  <span className="text-on-surface-variant block">Name</span>
                  <span className="font-semibold">{getCustomerName(selectedEnquiry.customerId)}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Phone</span>
                  <span className="font-semibold">{getCustomerPhone(selectedEnquiry.customerId)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Enquiries;
