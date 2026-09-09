import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';

export const Analytics = () => {
  return (
    <div className="w-full px-8 py-8">
      <div className="flex flex-col w-full space-y-8">
        <PageHeader 
          title="Business Analytics & Predictive Intelligence"
          category="Predictive Intelligence & Venue Yield"
          icon="insert_chart"
          description="Real-time trends, forward banquet demand modeling, dynamic yield scoring, and banquet financial dynamics for Rawalpindi & Islamabad marquee grounds."
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" icon="tune">Variables</Button>
              <Button variant="primary" icon="download">Export Dossier</Button>
            </div>
          }
        />
        
        {/* Date Context */}
        <div className="flex flex-wrap items-center gap-3 bg-surface-container-lowest p-3 rounded-lg shadow-sm">
           <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded text-on-surface-variant shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="font-label-sm text-label-sm tracking-normal">Live Engine · Today 02:15 PM</span>
            </div>
            <div className="flex items-center bg-surface-container-lowest px-3 py-1.5 rounded shadow-sm border border-surface-container-high">
              <span className="material-symbols-outlined text-secondary text-[18px] mr-2">calendar_month</span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface leading-tight">01 Sep 2026 – 30 Sep 2026</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">vs Aug 2026 (Previous Cycle)</span>
              </div>
            </div>
        </div>


        {/* 6 Key Executive Metric Tiles with Sparklines */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Gross Revenue</span>
              <span className="inline-flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold bg-secondary-container/20 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +14.6%
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-sm text-headline-sm text-primary tracking-tight">PKR 8.42M</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Target: PKR 8.00M (105.2%)</div>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Operating Profit</span>
              <span className="inline-flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold bg-secondary-container/20 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +17.4%
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-sm text-headline-sm text-on-surface tracking-tight flex items-baseline gap-1">
                <span>PKR 6.04M</span>
                <span className="font-label-sm text-label-sm text-secondary font-bold">71.7% margin</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Prior: PKR 5.14M (Aug)</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Bookings Sealed</span>
              <span className="inline-flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold bg-secondary-container/20 px-1.5 py-0.5 rounded">
                +12.0%
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-sm text-headline-sm text-on-surface tracking-tight">42 Banquets</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">26 Night · 16 Luncheons</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Avg Booking Value</span>
              <span className="inline-flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold bg-secondary-container/20 px-1.5 py-0.5 rounded">
                +6.8%
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-sm text-headline-sm text-on-surface tracking-tight">PKR 200,450</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">PKR 2,150 / Attendee Yield</div>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Hall Utilization</span>
              <span className="inline-flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold bg-secondary-container/20 px-1.5 py-0.5 rounded">
                +4.2%
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-sm text-headline-sm text-on-surface tracking-tight">78.4%</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Fri/Sat Slots: 96.0% Load</div>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-4 rounded shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Inquiry Conversion</span>
              <span className="inline-flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold bg-secondary-container/20 px-1.5 py-0.5 rounded">
                +3.8%
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-sm text-headline-sm text-on-surface tracking-tight">32.4%</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">42 Wins out of 130 Leads</div>
            </div>
          </div>
        </section>

        {/* Strategic Executive Radial: Business Health Score & AI Smart Insights */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-5 bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between pb-4 border-b border-surface-container-highest">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Comprehensive Scoring</span>
                <h2 className="font-headline-sm text-headline-sm text-primary">Composite Business Health Index</h2>
              </div>
              <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 my-6">
              <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-headline-md text-primary font-bold leading-none">87</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">/ 100</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-1.5 text-secondary font-label-md text-label-md font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> Tier A1: Exceptional Yield
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                  Operational efficiency, prime weekend conversion, and gross margins remain comfortably above 5-year Marquee historical records.
                </p>
                <div className="mt-3 text-primary font-title-sm text-title-sm font-semibold flex items-center gap-1">
                  <span>Next review cycle in 18 days</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-surface-container-highest">
              <div className="bg-surface-container-low p-2.5 rounded">
                <div className="font-label-sm text-label-sm text-on-surface-variant">Revenue Momentum</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-currency-num text-currency-num text-primary">92</span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">Strong</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded">
                <div className="font-label-sm text-label-sm text-on-surface-variant">Profitability Index</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-currency-num text-currency-num text-primary">94</span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">Peak</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded">
                <div className="font-label-sm text-label-sm text-on-surface-variant">Operational Rigor</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-currency-num text-currency-num text-on-surface">89</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Optimal</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="xl:col-span-7 bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">psychology</span>
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Automated Yield Intelligence</span>
                  <h2 className="font-headline-sm text-headline-sm text-primary">Executive Insights & Strategic Actions</h2>
                </div>
              </div>
              <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold">4 Key Directives</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="bg-surface-container-low p-4 rounded flex flex-col justify-between group hover:bg-surface-container transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">currency_exchange</span>
                    <span className="font-title-sm text-title-sm text-primary font-bold">Prime Weekend Premium</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                    Grand Hall Friday & Saturday inquiries exceed capacity by 18%. Market willing to absorb prime date adjustments.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container-highest flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Action: +PKR 45K Weekend Surcharge</span>
                  <button className="text-primary hover:text-secondary"><span className="material-symbols-outlined text-[18px]">arrow_forward</span></button>
                </div>
              </div>
              
              <div className="bg-surface-container-low p-4 rounded flex flex-col justify-between group hover:bg-surface-container transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">award_star</span>
                    <span className="font-title-sm text-title-sm text-primary font-bold">Royal Gold Package Flywheel</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                    Achieving highest inquiry closure rate (44%) and premier 68% contribution margin. Outstanding client praise on live stations.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container-highest flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Action: Prioritize for 400+ Pax Enquiries</span>
                  <button className="text-primary hover:text-secondary"><span className="material-symbols-outlined text-[18px]">arrow_forward</span></button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analytics;
