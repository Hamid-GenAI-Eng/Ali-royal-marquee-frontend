import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Phone, MapPin, Calendar, MessageSquare, Briefcase, FileText } from 'lucide-react';
import clsx from 'clsx';
import { useToast } from '../../context/ToastContext';

type TabType = 'overview' | 'followups' | 'timeline' | 'quotations' | 'requirements';

export const EnquiryDetails = () => {
  const { enquiryId } = useParams<{ enquiryId: string }>();
  const navigate = useNavigate();
  const { enquiries, customers, updateEnquiry } = useMockData();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const enquiry = enquiries.find((e) => e.id === enquiryId);
  const matchedCustomer = customers.find(c => c.id === enquiry?.customerId);
  const displayPhone = matchedCustomer?.phone || enquiry?.phone || 'N/A';
  const displayName = matchedCustomer?.name || enquiry?.name || 'Unknown Prospect';

  if (!enquiry) {
    return <div className="p-8 text-center text-on-surface-variant">Enquiry not found.</div>;
  }

  const handleUpdateStatus = (newStatus: any) => {
    updateEnquiry(enquiry.id, { status: newStatus });
    success(`Enquiry marked as ${newStatus}`);
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Lead Overview' },
    { id: 'requirements', label: 'Event Requirements' },
    { id: 'followups', label: 'Follow-ups' },
    { id: 'quotations', label: 'Quotations' },
    { id: 'timeline', label: 'Timeline' },
  ];

  // Lead Scoring Mock
  const isHot = enquiry.status === 'Contacted' || enquiry.status === 'Qualified';
  const score = isHot ? 85 : 40;
  const estValue = 650000;

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      {/* HEADER SECTION */}
      <div className="border-b border-outline-variant/30 bg-surface px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
          <button onClick={() => navigate('/app/enquiries')} className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Enquiries
          </button>
          <span>/</span>
          <span className="font-medium text-on-surface">{enquiry.id}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary-container text-on-primary-container font-headline-lg flex items-center justify-center rounded-full shrink-0">
              {displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-on-surface">{displayName}</h1>
                <Badge variant={enquiry.status === 'New' ? 'primary' : enquiry.status === 'Converted' ? 'success' : 'warning'} className="text-sm px-3 py-1">
                  {enquiry.status}
                </Badge>
                {matchedCustomer && (
                  <Badge variant="secondary" className="text-sm px-3 py-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> Existing Client
                  </Badge>
                )}
              </div>
              <div className="flex items-center flex-wrap gap-4 text-on-surface-variant mt-2">
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {displayPhone}</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Event Date: {enquiry.dateStr}</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Source: Instagram</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Button variant="primary" icon="edit">Edit Lead</Button>
              <Button 
                variant="secondary" 
                icon="check_circle"
                onClick={() => navigate('/app/bookings/new', { state: { fromEnquiry: enquiry, customer: matchedCustomer } })}
              >
                Convert to Booking
              </Button>
              <Button variant="outline" icon="calendar_today">Schedule Call</Button>
            </div>
            <div className="flex items-center justify-end gap-3 text-sm">
              <button className="text-primary hover:underline flex items-center gap-1"><MessageSquare className="w-4 h-4"/> WhatsApp</button>
              <span className="text-outline-variant">•</span>
              <button className="text-primary hover:underline flex items-center gap-1"><FileText className="w-4 h-4"/> Send Quote</button>
              <span className="text-outline-variant">•</span>
              <button className="text-error hover:underline flex items-center gap-1" onClick={() => handleUpdateStatus('Lost')}>Mark Lost</button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="px-8 py-6 bg-surface-container-lowest border-b border-outline-variant/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className={clsx("absolute left-0 top-0 bottom-0 w-1", isHot ? "bg-error" : "bg-warning")}></div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Lead Temperature</div>
            <div className={clsx("text-3xl font-bold", isHot ? "text-error" : "text-warning")}>{isHot ? 'Hot' : 'Warm'}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Conversion Score</div>
            <div className="text-3xl font-bold text-on-surface">{score}/100</div>
            <div className="w-full bg-surface-variant h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${score}%` }}></div>
            </div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-success"></div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Est. Value</div>
            <div className="text-3xl font-currency-num font-bold text-success">PKR {estValue.toLocaleString()}</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Next Action Due</div>
            <div className="text-3xl font-bold text-primary">Today</div>
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
                <h3 className="font-title-lg mb-4">Lead Information</h3>
                <div className="bg-surface rounded-xl border border-outline-variant/40 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Customer Name</div>
                    <div className="col-span-2 font-medium">{displayName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Contact Number</div>
                    <div className="col-span-2 font-medium">{displayPhone}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Inquiry Date</div>
                    <div className="col-span-2 font-medium">{enquiry.dateStr} (Created date)</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 text-on-surface-variant text-sm">Sales Rep</div>
                    <div className="col-span-2 font-medium">Asad Ali</div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="font-title-lg mb-4">Event Snapshot</h3>
                <div className="bg-surface rounded-xl border border-outline-variant/40 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Event Type</div>
                    <div className="col-span-2 font-medium">{enquiry.type || 'Wedding (Default)'}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Target Date</div>
                    <div className="col-span-2 font-medium">{enquiry.dateStr}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/20 pb-3">
                    <div className="col-span-1 text-on-surface-variant text-sm">Expected Guests</div>
                    <div className="col-span-2 font-medium">{enquiry.guests}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 text-on-surface-variant text-sm">Venue Preference</div>
                    <div className="col-span-2 font-medium">{enquiry.hall || 'Grand Ballroom'}</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'followups' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-title-lg">Follow-up Log</h3>
              <Button variant="primary" icon="add">Log Interaction</Button>
            </div>
            <div className="space-y-4">
              <div className="bg-surface border border-outline-variant/40 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold">WhatsApp Message Sent</div>
                  <div className="text-xs text-on-surface-variant">Today, 10:30 AM</div>
                </div>
                <p className="text-on-surface-variant text-sm">Sent the standard quotation for Royal Gold package as requested. Awaiting reply.</p>
                <div className="text-xs text-primary mt-2">Logged by: Asad Ali</div>
              </div>
              <div className="bg-surface border border-outline-variant/40 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold">Initial Call (Inbound)</div>
                  <div className="text-xs text-on-surface-variant">Yesterday, 14:15 PM</div>
                </div>
                <p className="text-on-surface-variant text-sm">Customer called to inquire about availability for December. Interested in the Main Hall.</p>
                <div className="text-xs text-primary mt-2">Logged by: Reception</div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for others */}
        {['timeline', 'quotations', 'requirements'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
            <h3 className="text-xl font-medium text-on-surface mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Workspace</h3>
            <p>Ready for integration.</p>
          </div>
        )}
      </div>
    </div>
  );
};
