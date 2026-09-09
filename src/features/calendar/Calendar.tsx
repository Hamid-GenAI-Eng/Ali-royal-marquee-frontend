import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';

export const Calendar = () => {
  return (
    <div className="w-full px-8 py-8">
      <div className="flex flex-col w-full space-y-8">
        <PageHeader 
          title="Calendar & Venue Availability"
          category="Estate Operations"
          icon="calendar_month"
          description="Real-time hall occupancy, conflict prevention engine, and banquet schedule coordination across Ali Royal Marquee estate."
          actions={
            <>
              <Button variant="outline" icon="lock">Block / Hold</Button>
              <Button variant="primary" icon="add">New Booking</Button>
            </>
          }
        />

        {/* Filters and Views */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="w-64">
               <SearchInput placeholder="Search booking, client, VIP..." value="" onChange={() => {}} />
             </div>
             <Button variant="outline" icon="tune">Filters</Button>
          </div>
          <div className="bg-surface-container-low p-1 rounded flex items-center shadow-inner">
            <button className="bg-surface-container-lowest text-primary shadow-sm font-title-sm text-title-sm px-3.5 py-1.5 rounded font-semibold transition-all" type="button">Month</button>
            <button className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm px-3 py-1.5 rounded transition-colors" type="button">Week</button>
            <button className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm px-3 py-1.5 rounded transition-colors" type="button">Day</button>
            <button className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm px-3 py-1.5 rounded transition-colors" type="button">List</button>
          </div>
        </div>


        {/* VENUE AVAILABILITY & CAPACITY SUMMARY */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Today's Operations</span>
                <div className="font-headline-md text-headline-md text-primary mt-1 flex items-baseline gap-2">
                  <span>3 Active</span>
                  <span className="font-label-sm text-label-sm font-semibold px-2 py-0.5 rounded bg-secondary-container/50 text-secondary">Peak Day</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">festival</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span>2 Night Galas, 1 Day Mehndi</span>
              <span className="font-semibold text-primary">1,350 Pax</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Available Shifts (Sep)</span>
                <div className="font-headline-md text-headline-md text-on-surface mt-1 flex items-baseline gap-2">
                  <span>12 Prime Slots</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">7 Weekend</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">event_available</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span>Remaining in Crystal & Garden</span>
              <span className="font-semibold text-secondary">Book Fast</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-fixed-dim"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Tentative Holds</span>
                <div className="font-headline-md text-headline-md text-on-surface mt-1 flex items-baseline gap-2">
                  <span>4 Inquiries</span>
                  <span className="font-label-sm text-label-sm bg-error-container/60 text-on-error-container px-2 py-0.5 rounded font-semibold">1 Alert</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[22px]">pending_actions</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span>PKR 2.45M pipeline</span>
              <span className="font-semibold text-on-surface">Deposit Pending</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Estate Utilization</span>
                <div className="font-headline-md text-headline-md text-primary mt-1 flex items-baseline gap-2">
                  <span>78.4%</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">+6.2% MoM</span>
                </div>
              </div>
              <div className="relative w-10 h-10">
                <span className="absolute inset-0 flex items-center justify-center font-label-sm text-label-sm font-bold text-primary">78%</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span>Royal Grand Hall: 88% Booked</span>
              <span className="font-semibold text-primary">Peak Season</span>
            </div>
          </div>
        </section>

        {/* SMART CONFLICT DETECTION RIBBON */}
        <section className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-title-sm text-title-sm text-error font-bold">Slot Overlap Conflict Detected</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wide bg-error/10 text-error px-2 py-0.2 rounded font-bold">Action Required</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Fri, 18 Sep 2026 (Royal Grand Hall Night Shift): 2 tentative holds overlap.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button className="bg-surface-container text-on-surface hover:bg-surface-container-high px-3.5 py-1.5 rounded font-title-sm text-title-sm transition-colors" type="button">
              Shift to Crystal
            </button>
            <button className="bg-primary-container hover:bg-primary text-on-primary px-4 py-1.5 rounded font-title-sm text-title-sm font-semibold transition-colors shadow-sm" type="button">
              Resolve Conflict
            </button>
          </div>
        </section>

        {/* CALENDAR GRID */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-surface-container-low rounded p-1 shadow-inner">
                <button className="p-1 hover:bg-surface-container-lowest rounded transition-colors text-on-surface" type="button">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <span className="font-headline-sm text-headline-sm text-primary px-4">September 2026</span>
                <button className="p-1 hover:bg-surface-container-lowest rounded transition-colors text-on-surface" type="button">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
              <button className="bg-secondary-container/40 hover:bg-secondary-container text-secondary px-3 py-1.5 rounded font-title-sm text-title-sm font-semibold transition-colors" type="button">
                Today (Thu, 12 Sep)
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1 rounded">
              <button className="bg-surface-container-lowest text-primary font-label-md text-label-md font-bold px-3 py-1.5 rounded shadow-sm" type="button">All Venues (4)</button>
              <button className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-2.5 py-1.5 rounded transition-colors" type="button">Grand Hall (800)</button>
              <button className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-2.5 py-1.5 rounded transition-colors" type="button">Crystal (500)</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className={`text-center py-2 font-label-sm text-label-sm uppercase tracking-wider font-bold ${['Thu', 'Fri', 'Sat', 'Sun'].includes(day) ? (day === 'Thu' ? 'text-secondary' : 'text-primary') : 'text-on-surface-variant'}`}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="bg-surface-container-low min-h-[110px] p-2 rounded flex flex-col justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-title-sm text-title-sm font-semibold text-on-surface">{(i % 30) + 1}</span>
                  {(i % 7) === 4 ? <span className="font-label-sm text-[10px] text-error font-bold">1 Left</span> : <span className="font-label-sm text-[10px] text-secondary">Free</span>}
                </div>
                <div className="space-y-1 my-1">
                  {i % 3 === 0 && (
                    <div className="bg-primary-container text-on-primary px-1.5 py-0.5 rounded text-[10px] font-semibold truncate shadow-xs">
                      🌙 Night: Gala Dinner
                    </div>
                  )}
                  {i % 4 === 0 && (
                    <div className="bg-secondary-fixed/50 text-on-secondary-fixed px-1.5 py-0.5 rounded text-[10px] font-semibold truncate">
                      ☀️ Day: Engagement (Hold)
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Calendar;
