import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataGrid } from '../../components/ui/DataGrid';
import type { ColumnDef } from '../../components/ui/DataGrid';
import { Badge } from '../../components/ui/Badge';
// import { } from '../../components/ui/Drawer';
import { PageHeader } from '../../components/ui/PageHeader';
// import { } from '../../context/MockDataContext';
import type { Package } from '../../types';
export const PackagesMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.state?.fromBusiness;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'packages' | 'menu' | 'addons' | 'pricing'>('packages');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const mockPackages: Package[] = useMemo(() => [
    { id: 'PKG-001', name: 'Royal Gold Wedding Package', type: 'Flagship', price: 2000, status: 'Active', minGuests: 300 },
    { id: 'PKG-002', name: 'Silver Walima Package', type: 'Standard', price: 1500, status: 'Active', minGuests: 200 },
    { id: 'PKG-003', name: 'Platinum Mehndi Package', type: 'Premium', price: 2500, status: 'Active', minGuests: 150 },
    { id: 'PKG-004', name: 'Corporate Gala Bundle', type: 'Corporate', price: 1200, status: 'Active', minGuests: 100 },
    { id: 'PKG-005', name: 'Bespoke Executive', type: 'Custom', price: 3000, status: 'Draft', minGuests: 50 },
  ], []);

  const handleSort = (colKey: string) => {
    if (sortColumn === colKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colKey);
      setSortDirection('asc');
    }
  };

  const filteredData = useMemo(() => {
    let result = mockPackages;
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerSearch) || p.type.toLowerCase().includes(lowerSearch));
    }
    result.sort((a, b) => {
      const valA = (a as any)[sortColumn];
      const valB = (b as any)[sortColumn];
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [searchTerm, sortColumn, sortDirection, mockPackages]);

  const columns: ColumnDef<Package>[] = [
    { key: 'id', header: 'Package ID', render: (item) => <span className="font-semibold text-primary">{item.id}</span> },
    { key: 'name', header: 'Package Name', sortable: true, render: (item) => <span className="font-semibold text-on-surface">{item.name}</span> },
    { key: 'type', header: 'Type / Tier', sortable: true },
    { key: 'minGuests', header: 'Min Guests', sortable: true, render: (item) => <span>{item.minGuests} Pax</span> },
    { key: 'price', header: 'Base Price', sortable: true, align: 'right', render: (item) => <span className="font-currency-num font-bold text-primary">PKR {item.price.toLocaleString()}</span> },
    { key: 'status', header: 'Status', align: 'right', render: (item) => {
        let variant: any = 'neutral';
        if (item.status === 'Active') variant = 'success';
        if (item.status === 'Draft') variant = 'warning';
        if (item.status === 'Archived') variant = 'error';
        return <Badge variant={variant}>{item.status}</Badge>;
    }}
  ];

  return (
    <div className="w-full px-8 py-8">
      <div className="flex flex-col w-full">
        <PageHeader 
          title="Packages & Menu Management"
          category="Commercial Operations"
          icon="layers"
          description="Curate luxury banquet tiers, culinary riders, per-head rate cards, and bespoke event add-ons across Ali Royal Marquee venues."
          onBack={showBack ? () => navigate(-1) : undefined}
          actions={
            <>
              <div className="flex items-center bg-surface-container-lowest px-3.5 py-2 rounded-lg shadow-sm border border-outline-variant/60">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant mr-2">search</span>
                <input 
                  className="bg-transparent text-on-surface font-body-sm text-body-sm outline-none w-48 placeholder:text-on-surface-variant/60" 
                  placeholder="Search catalog, dish, SKU..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant ml-2 font-medium">⌘K</span>
              </div>
              <button className="flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container-low text-primary-container px-4 py-2 rounded-lg shadow-sm transition-all border border-outline-variant/60 font-title-sm text-title-sm font-medium" type="button">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add Menu Item</span>
              </button>
              <button className="flex items-center gap-2.5 bg-primary-container hover:bg-primary text-on-primary px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all" type="button" onClick={() => navigate('/app/packages/new')}>
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed">layers</span>
                <span className="font-title-sm text-title-sm font-semibold tracking-wide">Create Package</span>
              </button>
            </>
          }
        />

        {/* Executive Summary KPI Cards (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Active Packages</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display text-display text-primary leading-none">12</span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">Tiers</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">auto_awesome_motion</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2.5">
              <span>Across 4 Venue Halls</span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">+2 Seasonal</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Culinary Dishes</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display text-display text-on-surface leading-none">18</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Collections</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">restaurant</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2.5">
              <span className="truncate">Desi, Continental & Mughal</span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">Live Live</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Add-on Inventory</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display text-display text-on-surface leading-none">24</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Upgrades</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">room_service</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2.5">
              <span className="truncate">Live Stalls, Floral, FX</span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Active</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Top Revenue Tier</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-headline-md text-headline-md text-primary font-bold">Royal Gold</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">hotel_class</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2.5">
              <span>42 Confirmed Events</span>
              <span className="font-currency-num text-[13px] text-primary font-bold">PKR 32.8M</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Average Head Yield</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-currency-num text-headline-md text-primary font-bold">1,950</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">PKR/Pax</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">trending_up</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low/50 -mx-5 -mb-5 px-5 py-2.5">
              <span>Season Index 2025</span>
              <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>14% YoY
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation & Action Bar */}
        <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setActiveTab('packages')}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-lg font-title-sm text-title-sm transition-colors ${activeTab === 'packages' ? 'bg-primary text-secondary-fixed shadow-sm font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`} 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Packages (12)</span>
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-title-sm text-title-sm transition-colors ${activeTab === 'menu' ? 'bg-primary text-secondary-fixed shadow-sm font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`} 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>Menu Repository (18)</span>
            </button>
            <button 
              onClick={() => setActiveTab('addons')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-title-sm text-title-sm transition-colors ${activeTab === 'addons' ? 'bg-primary text-secondary-fixed shadow-sm font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`} 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">extension</span>
              <span>Add-ons & Upgrades (24)</span>
            </button>
            <button 
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-title-sm text-title-sm transition-colors ${activeTab === 'pricing' ? 'bg-primary text-secondary-fixed shadow-sm font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`} 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">percent</span>
              <span>Pricing & Surcharge Engine</span>
            </button>
          </div>
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <button className="flex items-center gap-2 text-primary font-title-sm text-title-sm px-3 py-1.5 rounded-lg bg-primary-fixed/30 hover:bg-primary-fixed/50 transition-colors" type="button">
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span>Launch Pricing Calculator</span>
            </button>
            <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm px-3 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors" type="button">
              <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
              <span>Compare Tiers</span>
            </button>
          </div>
        </div>

        {activeTab === 'packages' && (
          <>
            {/* Sub-Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <button className="bg-surface-container-high text-primary px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-bold shadow-xs" type="button">
              All Tiers (12)
            </button>
            <button className="bg-surface-container-lowest text-on-surface-variant hover:text-on-surface px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-medium transition-colors" type="button">
              Wedding & Walima (6)
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sort by:</span>
            <select className="bg-surface-container-lowest text-on-surface font-title-sm text-title-sm rounded-lg px-3 py-1.5 outline-none shadow-xs">
              <option>Per-Head Yield (High to Low)</option>
              <option>Total Bookings Volume</option>
            </select>
          </div>
        </div>

        {/* FEATURED BANQUET PACKAGE */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm mb-10 overflow-hidden relative">
          <div className="h-1.5 w-full bg-secondary"></div>
          <div className="p-6 lg:p-8 flex flex-col xl:flex-row gap-8">
            <div className="xl:w-5/12 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    Flagship · Most Popular
                  </span>
                  <div className="space-y-4">
                    <span className="bg-secondary-fixed/50 text-secondary px-2.5 py-0.5 rounded font-label-sm text-label-sm font-semibold">
                      Peak Season 2025
                    </span>
                  </div>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Royal Gold Wedding Package</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Our signature luxury bridal offering combining live Royal Mughal tandoor counters, multi-tier floral stage decor, and dedicated executive floor captaincy.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-sm h-48 w-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                [Image: Luxurious wedding marquee]
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center gap-3 text-on-primary">
                    <span className="material-symbols-outlined text-[20px] text-secondary-fixed">verified_user</span>
                    <span className="font-title-sm text-title-sm">Includes Crystal Grand Hall & Executive VIP Mezzanine</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block font-medium">Head Tariff</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-label-md text-label-md text-primary font-bold">PKR</span>
                    <span className="font-display text-headline-lg text-primary font-bold">2,000</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">/ Guest</span>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-surface-variant"></div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block font-medium">Minimum Floor</span>
                  <span className="font-title-md text-title-md text-on-surface font-bold mt-0.5 block">PKR 900,000</span>
                </div>
                <div className="h-10 w-[1px] bg-surface-variant"></div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block font-medium">Guest Range</span>
                  <span className="font-title-md text-title-md text-on-surface font-bold mt-0.5 block">300 – 800 Pax</span>
                </div>
              </div>
            </div>
            
            <div className="xl:w-7/12 flex flex-col justify-between bg-surface-container-low/40 rounded-xl p-6">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">restaurant_menu</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary">Inclusions & Culinary Matrix</h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest px-2.5 py-1 rounded shadow-xs">
                    7 Kitchen Sections · Fully Customizable
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm">
                  <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-title-sm text-title-sm text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">local_bar</span>
                        Welcome Refreshments
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">2 Items</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed">
                      Fresh Mint Margarita & Chilled Peach Cooler, Miniature Rooh Afza Tukhm-e-Sharbati Shooters on entrance.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-title-sm text-title-sm text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">skillet</span>
                        Live Starters
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">2 Courses</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed">
                      Chicken Cheese Malai Boti (Charcoal Station), Crispy Shanghai Wonton Cups with sweet tamarind glaze.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-title-sm text-title-sm text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">soup_kitchen</span>
                        Royal Mughal Main Courses
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">4 Gourmet Dishes</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-surface-variant mt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span className="font-medium text-on-surface">Desi Ghee Mutton Karahi</span> (Fresh Cut)
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span className="font-medium text-on-surface">Royal Dum Pukht Chicken Biryani</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl shadow-sm mb-10 overflow-hidden">
          <DataGrid 
            data={filteredData}
            columns={columns}
            keyExtractor={(item) => item.id}
            onRowClick={() => {}}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            currentPage={1}
            totalPages={1}
            totalItems={filteredData.length}
          />
        </div>
        </>
        )}

        {activeTab === 'menu' && (
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">menu_book</span>
            <h3 className="font-headline-sm text-headline-sm text-primary">Menu Repository</h3>
            <p className="text-on-surface-variant mt-2 max-w-md mx-auto">Manage your culinary dishes, ingredients, and kitchen sections.</p>
          </div>
        )}

        {activeTab === 'addons' && (
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">extension</span>
            <h3 className="font-headline-sm text-headline-sm text-primary">Add-ons & Upgrades</h3>
            <p className="text-on-surface-variant mt-2 max-w-md mx-auto">Configure floral decor, lighting packages, and live stalls.</p>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">percent</span>
            <h3 className="font-headline-sm text-headline-sm text-primary">Pricing & Surcharge Engine</h3>
            <p className="text-on-surface-variant mt-2 max-w-md mx-auto">Adjust per-head yields, seasonal multipliers, and tax rules.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PackagesMenu;
