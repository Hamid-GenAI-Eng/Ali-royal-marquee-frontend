// import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';

export const Dashboard = () => {
  return (
    <div className="w-full px-8 py-8">
      <div className="flex flex-col w-full space-y-8">
        
        <PageHeader 
          title="Command Center Overview"
          category="Fall Wedding Season • Peak Hall Demand"
          icon="dashboard"
          description="Real-time pulse of Ali Royal Marquee estate operations, revenue tracking, and immediate action items."
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary" icon="add_circle">New Booking</Button>
              <Button variant="outline" icon="person_add">Add Customer</Button>
              <Button variant="outline" icon="credit_card">Record Payment</Button>
            </div>
          }
        />


        {/* 2. KPI Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Total Revenue
                </span>
                <div className="mt-1 font-headline-sm text-headline-sm text-on-surface font-semibold">
                  PKR 4,285,000
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">
                  account_balance_wallet
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2">
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-secondary font-semibold">
                +12.8%
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">vs last month</span>
            </div>
          </div>

          <div className="relative bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Confirmed Bookings
                </span>
                <div className="mt-1 font-headline-sm text-headline-sm text-on-surface font-semibold">
                  28
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">event_seat</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2">
              <span className="material-symbols-outlined text-[14px] text-primary">
                calendar_month
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                6 upcoming this month
              </span>
            </div>
          </div>

          <div className="relative bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Outstanding
                </span>
                <div className="mt-1 font-headline-sm text-headline-sm text-on-surface font-semibold">
                  PKR 1,240,000
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">pending_actions</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2">
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-semibold">
                8 Pending
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Awaiting clearance
              </span>
            </div>
          </div>

          <div className="relative bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Total Expenses
                </span>
                <div className="mt-1 font-headline-sm text-headline-sm text-on-surface font-semibold">
                  PKR 1,385,000
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2">
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-semibold">
                +4.2%
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Within budget cap
              </span>
            </div>
          </div>

          <div className="relative bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Estimated Net Profit
                </span>
                <div className="mt-1 font-headline-sm text-headline-sm text-on-surface font-semibold">
                  PKR 2,900,000
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2">
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">
                67.7% Margin
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                High Season
              </span>
            </div>
          </div>
        </section>

        {/* 3. Charts & Performance Row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">
                    Revenue Overview
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Monthly cash flow & profitability trajectory
                  </p>
                </div>
                <div className="flex items-center bg-surface-container p-0.5 rounded">
                  <button
                    className="px-3 py-1 font-label-sm text-label-sm rounded bg-surface-container-lowest text-primary font-semibold shadow-xs"
                    type="button"
                  >
                    Revenue
                  </button>
                  <button
                    className="px-3 py-1 font-label-sm text-label-sm rounded text-on-surface-variant hover:text-on-surface transition-colors"
                    type="button"
                  >
                    Expenses
                  </button>
                  <button
                    className="px-3 py-1 font-label-sm text-label-sm rounded text-on-surface-variant hover:text-on-surface transition-colors"
                    type="button"
                  >
                    Profit
                  </button>
                </div>
              </div>
              {/* Interactive SVG Chart */}
              <div className="relative w-full h-64 pt-4">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 220">
                  <line opacity="0.4" stroke="#dbc0c0" strokeDasharray="3 3" strokeWidth="0.75" x1="40" x2="580" y1="20" y2="20"></line>
                  <line opacity="0.4" stroke="#dbc0c0" strokeDasharray="3 3" strokeWidth="0.75" x1="40" x2="580" y1="70" y2="70"></line>
                  <line opacity="0.4" stroke="#dbc0c0" strokeDasharray="3 3" strokeWidth="0.75" x1="40" x2="580" y1="120" y2="120"></line>
                  <line opacity="0.6" stroke="#dbc0c0" strokeWidth="0.75" x1="40" x2="580" y1="170" y2="170"></line>
                  
                  <text className="text-[10px] fill-current text-on-surface-variant font-mono" textAnchor="end" x="32" y="24">5M</text>
                  <text className="text-[10px] fill-current text-on-surface-variant font-mono" textAnchor="end" x="32" y="74">3.5M</text>
                  <text className="text-[10px] fill-current text-on-surface-variant font-mono" textAnchor="end" x="32" y="124">2M</text>
                  <text className="text-[10px] fill-current text-on-surface-variant font-mono" textAnchor="end" x="32" y="174">0</text>
                  
                  <rect className="fill-primary-container/90" height="80" rx="2" width="16" x="75" y="90"></rect>
                  <rect className="fill-outline-variant/60" height="40" rx="2" width="16" x="94" y="130"></rect>
                  
                  <rect className="fill-primary-container/90" height="95" rx="2" width="16" x="165" y="75"></rect>
                  <rect className="fill-outline-variant/60" height="45" rx="2" width="16" x="184" y="125"></rect>
                  
                  <rect className="fill-primary-container/90" height="60" rx="2" width="16" x="255" y="110"></rect>
                  <rect className="fill-outline-variant/60" height="30" rx="2" width="16" x="274" y="140"></rect>
                  
                  <rect className="fill-primary-container/90" height="85" rx="2" width="16" x="345" y="85"></rect>
                  <rect className="fill-outline-variant/60" height="38" rx="2" width="16" x="364" y="132"></rect>
                  
                  <rect className="fill-primary-container/90" height="110" rx="2" width="16" x="435" y="60"></rect>
                  <rect className="fill-outline-variant/60" height="50" rx="2" width="16" x="454" y="120"></rect>
                  
                  <rect className="fill-primary" height="132" rx="2" width="16" x="525" y="38"></rect>
                  <rect className="fill-secondary-fixed" height="52" rx="2" width="16" x="544" y="118"></rect>
                  
                  <path d="M 83 120 L 173 105 L 263 138 L 353 112 L 443 88 L 533 58" fill="none" stroke="#775a1a" strokeLinecap="round" strokeWidth="2.5"></path>
                  <polygon fill="#fed489" points="83,116 87,120 83,124 79,120" stroke="#775a1a" strokeWidth="1.5"></polygon>
                  <polygon fill="#fed489" points="173,101 177,105 173,109 169,105" stroke="#775a1a" strokeWidth="1.5"></polygon>
                  <polygon fill="#fed489" points="263,134 267,138 263,142 259,138" stroke="#775a1a" strokeWidth="1.5"></polygon>
                  <polygon fill="#fed489" points="353,108 357,112 353,116 349,112" stroke="#775a1a" strokeWidth="1.5"></polygon>
                  <polygon fill="#fed489" points="443,84 447,88 443,92 439,88" stroke="#775a1a" strokeWidth="1.5"></polygon>
                  <polygon fill="#fed489" points="533,54 537,58 533,62 529,58" stroke="#775a1a" strokeWidth="1.5"></polygon>
                  
                  <text className="text-[11px] fill-current text-on-surface-variant font-medium" textAnchor="middle" x="93" y="195">Apr</text>
                  <text className="text-[11px] fill-current text-on-surface-variant font-medium" textAnchor="middle" x="183" y="195">May</text>
                  <text className="text-[11px] fill-current text-on-surface-variant font-medium" textAnchor="middle" x="273" y="195">Jun</text>
                  <text className="text-[11px] fill-current text-on-surface-variant font-medium" textAnchor="middle" x="363" y="195">Jul</text>
                  <text className="text-[11px] fill-current text-on-surface-variant font-medium" textAnchor="middle" x="453" y="195">Aug</text>
                  <text className="text-[11px] fill-current text-primary font-bold" textAnchor="middle" x="543" y="195">Sep (Active)</text>
                </svg>
              </div>
            </div>
            {/* Legend & Month Summary */}
            <div className="pt-4 mt-2 flex flex-wrap items-center justify-between gap-3 bg-surface-container-low px-4 py-2.5 rounded">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-primary"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Revenue: <strong className="text-on-surface font-title-sm">PKR 4.28M</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-secondary-fixed"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Expenses: <strong className="text-on-surface font-title-sm">PKR 1.38M</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rotate-45 bg-secondary"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Net Profit: <strong className="text-secondary font-title-sm">PKR 2.90M</strong></span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest px-2 py-0.5 rounded">Target: 108% Met</span>
            </div>
          </div>

          {/* Right Column: Booking Performance */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="pb-3">
                <h3 className="font-headline-sm text-headline-sm text-primary">Booking Performance</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Current season pipeline breakdown</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-3">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" fill="transparent" r="46" stroke="#f0eee8" strokeWidth="12"></circle>
                    <circle cx="60" cy="60" fill="transparent" r="46" stroke="#5a0f1b" strokeDasharray="187.8 289" strokeDashoffset="0" strokeWidth="12"></circle>
                    <circle cx="60" cy="60" fill="transparent" r="46" stroke="#fed489" strokeDasharray="57.8 289" strokeDashoffset="-187.8" strokeWidth="12"></circle>
                    <circle cx="60" cy="60" fill="transparent" r="46" stroke="#775a1a" strokeDasharray="28.9 289" strokeDashoffset="-245.6" strokeWidth="12"></circle>
                    <circle cx="60" cy="60" fill="transparent" r="46" stroke="#ba1a1a" strokeDasharray="14.4 289" strokeDashoffset="-274.5" strokeWidth="12"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-headline-md text-headline-md font-bold text-primary leading-none">28</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mt-1">Total Bookings</span>
                  </div>
                </div>
                <div className="space-y-3 w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">Confirmed (65%)</span>
                    </div>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">18</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">Tentative (20%)</span>
                    </div>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">6</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">Completed (10%)</span>
                    </div>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">3</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                      <span className="font-body-sm text-body-sm text-on-surface">Cancelled (5%)</span>
                    </div>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">1</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3 bg-surface-container-low p-3 rounded flex items-center justify-between">
              <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                <span>Lead conversion rate: <strong className="text-on-surface">74.2%</strong></span>
              </div>
              <a className="font-title-sm text-title-sm text-primary font-semibold hover:underline" href="#">View Pipeline</a>
            </div>
          </div>
        </section>

        {/* 4. Event Operations & Today's Schedule */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-headline-sm text-headline-sm text-primary">Upcoming Events</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm font-semibold text-on-surface-variant">Next 14 Days</span>
                </div>
                <a className="font-title-sm text-title-sm text-secondary font-semibold hover:underline flex items-center gap-1" href="#">
                  <span>View All Bookings</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Event Type</th>
                      <th className="py-3 px-3">Hall / Venue</th>
                      <th className="py-3 px-3 text-center">Guests</th>
                      <th className="py-3 px-3 text-right">Amount</th>
                      <th className="py-3 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/50">
                    <tr className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-3.5 px-3 font-title-sm text-title-sm text-primary font-bold whitespace-nowrap">12 Sep</td>
                      <td className="py-3.5 px-3">
                        <div className="font-title-sm text-title-sm text-on-surface font-semibold">Ahsan Malik</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">#BK-1042</div>
                      </td>
                      <td className="py-3.5 px-3 font-body-sm text-body-sm text-on-surface">Walima</td>
                      <td className="py-3.5 px-3 font-body-sm text-body-sm text-on-surface-variant">Royal Grand Hall</td>
                      <td className="py-3.5 px-3 font-title-sm text-title-sm text-on-surface text-center">450</td>
                      <td className="py-3.5 px-3 font-currency-num text-currency-num text-right text-on-surface">PKR 780,000</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="px-2.5 py-1 rounded font-label-sm text-label-sm font-semibold bg-surface-container text-on-surface">Confirmed</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-3.5 px-3 font-title-sm text-title-sm text-primary font-bold whitespace-nowrap">15 Sep</td>
                      <td className="py-3.5 px-3">
                        <div className="font-title-sm text-title-sm text-on-surface font-semibold">Usman & Family</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">#BK-1044</div>
                      </td>
                      <td className="py-3.5 px-3 font-body-sm text-body-sm text-on-surface">Mehndi</td>
                      <td className="py-3.5 px-3 font-body-sm text-body-sm text-on-surface-variant">Crystal Pavilion</td>
                      <td className="py-3.5 px-3 font-title-sm text-title-sm text-on-surface text-center">600</td>
                      <td className="py-3.5 px-3 font-currency-num text-currency-num text-right text-on-surface">PKR 1,050,000</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="px-2.5 py-1 rounded font-label-sm text-label-sm font-semibold bg-surface-container text-on-surface">Confirmed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pt-4 mt-3 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
              <span>Showing 2 of 14 upcoming bookings</span>
              <span className="font-title-sm text-title-sm text-primary font-semibold">Projected fortnight revenue: PKR 4,300,000</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                  <h3 className="font-headline-sm text-headline-sm text-primary">Today's Events</h3>
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold bg-secondary-container/50 px-2 py-0.5 rounded">Active Event Day</span>
              </div>
              <div className="space-y-6 pt-2">
                <div className="bg-surface-container-low p-4 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        <span>12:00 PM – 04:30 PM</span>
                      </div>
                      <h4 className="font-title-md text-title-md text-on-surface font-semibold mt-1">Afternoon Mehndi</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Crystal Pavilion • 350 Guests</p>
                    </div>
                    <span className="px-2 py-0.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded uppercase">Ready</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] font-label-sm text-label-sm text-on-surface-variant mb-1">
                      <span className="text-primary font-bold">Preparation</span>
                      <span className="text-primary font-bold">Ready</span>
                      <span>Live</span>
                      <span>Done</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden flex">
                      <div className="w-1/2 bg-primary h-full"></div>
                      <div className="w-1/4 bg-secondary h-full animate-pulse"></div>
                      <div className="w-1/4 bg-transparent h-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
