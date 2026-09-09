import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import clsx from 'clsx';

export const DashboardLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isExpanded={isSidebarExpanded} onHoverChange={setIsSidebarExpanded} />
      <div 
        className={clsx(
          "transition-[padding] duration-300 ease-in-out",
          isSidebarExpanded ? "pl-64" : "pl-20"
        )}
      >
        <Header isSidebarExpanded={isSidebarExpanded} />
        <main className="w-full pt-20 bg-background min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
