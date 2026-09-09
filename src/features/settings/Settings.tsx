// import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';

export const Settings = () => {
  return (
    <div className="w-full px-8 py-8">
      <div className="flex flex-col w-full space-y-8">
        <PageHeader 
          title="System Settings & Business Configuration"
          category="Enterprise Control Center"
          icon="settings"
          description="Configure Ali Royal Marquee estate operational parameters, security protocols, role-based authorization, peak pricing formulas, invoice templates, and real-time FBR/PRA tax integrations."
          actions={
            <Button variant="primary" icon="save">Save Changes</Button>
          }
        />


        {/* MAIN DUAL-COLUMN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-28">
          {/* LEFT COLUMN: EXECUTIVE SETTINGS NAVIGATION PANEL */}
          <aside className="lg:col-span-3 sticky top-24 bg-surface-container-lowest rounded-lg p-3 shadow-sm space-y-6">
            <div>
              <div className="px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70 font-bold mb-1.5 flex items-center justify-between">
                <span>General</span>
                <span className="text-[10px] text-secondary uppercase font-semibold">Estate</span>
              </div>
              <nav className="space-y-0.5">
                <a className="group flex items-center justify-between px-3 py-2 rounded bg-primary text-secondary-fixed shadow-[inset_3px_0_0_#ffdea5] font-semibold transition-all" href="#business-profile">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-secondary-fixed">domain</span>
                    <span className="font-title-sm text-title-sm truncate">Business Profile</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed opacity-80">chevron_right</span>
                </a>
                <a className="group flex items-center justify-between px-3 py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all" href="#regional-preferences">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-outline">tune</span>
                    <span className="font-title-sm text-title-sm truncate">Regional & System</span>
                  </div>
                </a>
                <a className="group flex items-center justify-between px-3 py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all" href="#">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-outline">translate</span>
                    <span className="font-title-sm text-title-sm truncate">Localization (Urdu/EN)</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] text-on-surface-variant font-bold">Dual</span>
                </a>
              </nav>
            </div>

            <div>
              <div className="px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70 font-bold mb-1.5">
                Users & Security
              </div>
              <nav className="space-y-0.5">
                <a className="flex items-center justify-between px-3 py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all" href="#">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                    <span className="font-title-sm text-title-sm truncate">Users & Accounts</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">8 Active</span>
                </a>
                <a className="flex items-center justify-between px-3 py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all" href="#rbac-matrix">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-outline">shield_person</span>
                    <span className="font-title-sm text-title-sm truncate">Roles & RBAC Matrix</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                </a>
              </nav>
            </div>
            
            <div className="p-3.5 rounded bg-surface-container-low space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Database Health</span>
                <span className="font-label-sm text-label-sm text-emerald-800 font-semibold">99.98%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full w-[94%]"></div>
              </div>
              <div className="flex justify-between items-center text-[11px] text-on-surface-variant">
                <span>Islamabad Server DC-2</span>
                <span>Encrypted (AES-256)</span>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN WORKSPACE: CONFIGURATION SECTIONS */}
          <div className="lg:col-span-9 space-y-10">
            {/* SECTION 1: BUSINESS PROFILE & SOVEREIGN BRANDING */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm relative overflow-hidden" id="business-profile">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary-container"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 shadow-[0_1px_0_0_rgba(231,222,213,0.7)]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">corporate_fare</span>
                    <h2 className="font-headline-md text-headline-md text-primary">Estate Identity & Legal Entity Details</h2>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Official venue credentials, brand assets, tax registrations, and executive contacts printed on client dossiers and legal contracts.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold tracking-wide">
                    Entity: Reg. 1998/PB
                  </span>
                </div>
              </div>

              <div className="pt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Registered Entity Name
                    </label>
                    <input className="w-full bg-surface-container-lowest rounded px-3.5 py-2.5 text-on-surface font-title-sm text-title-sm shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors" type="text" defaultValue="Ali Royal Marquee (Private) Limited" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Brand Display Name
                    </label>
                    <input className="w-full bg-surface-container-lowest rounded px-3.5 py-2.5 text-on-surface font-title-sm text-title-sm shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors" type="text" defaultValue="Ali Royal Marquee • Grand Ballroom & Lawns" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Primary Directorate Phone (Voice)
                    </label>
                    <div className="flex items-center bg-surface-container-lowest rounded px-3.5 py-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-outline text-[18px] mr-2">phone_in_talk</span>
                      <input className="w-full bg-transparent text-on-surface font-title-sm text-title-sm outline-none" type="text" defaultValue="+92 300 1234567" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                        Official WhatsApp Gateway
                      </label>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-emerald-800 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified Meta Business
                      </span>
                    </div>
                    <div className="flex items-center bg-surface-container-lowest rounded px-3.5 py-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-emerald-700 text-[18px] mr-2">chat</span>
                      <input className="w-full bg-transparent text-on-surface font-title-sm text-title-sm outline-none" type="text" defaultValue="+92 321 7890123" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Estate Physical & Venue Dispatch Address
                    </label>
                    <div className="flex items-start bg-surface-container-lowest rounded px-3.5 py-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-secondary text-[20px] mr-2.5 mt-0.5">pin_drop</span>
                      <textarea className="w-full bg-transparent text-on-surface font-body-md text-body-md outline-none resize-none" rows={2} defaultValue="Plot 14-B, Main Islamabad Expressway, Near Gulberg Greens Interchange, Islamabad, Punjab, Pakistan"></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 shadow-[0_-1px_0_0_rgba(231,222,213,0.7)]">
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                    <span>Last verified by Ali Raza (General Manager) on 01 Sep 2026</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded bg-surface-container-low text-primary hover:bg-surface-container font-title-sm text-title-sm font-semibold transition-colors" type="button">
                      Preview Customer Dossier
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded bg-primary-container hover:bg-primary text-on-primary font-title-sm text-title-sm font-semibold shadow transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px] text-secondary-fixed">save</span>
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
