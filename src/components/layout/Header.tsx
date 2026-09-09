import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useMockData } from '../../context/MockDataContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isSidebarExpanded: boolean;
}

export const Header = ({ isSidebarExpanded }: HeaderProps) => {
  const { notifications } = useMockData();

  const [currentDate, setCurrentDate] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: 07 Sep 2026
      const formattedDate = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      // Format: 09:42 AM
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentDate(`${formattedDate} · ${formattedTime}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotifClick = (link?: string) => {
    setIsNotifOpen(false);
    if (link) {
      navigate(link);
    }
  };

  return (
    <header 
      className={clsx(
        "fixed top-0 right-0 h-20 bg-surface-container-lowest z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-[left] duration-300 ease-in-out",
        isSidebarExpanded ? "left-64" : "left-20"
      )}
    >
      <div className="h-20 w-full px-8 flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <div className="font-headline-sm text-headline-sm text-primary">
            Good morning, Admin
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            Here's what's happening with Ali Royal Marquee today.
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden xl:flex items-center gap-2 text-on-surface-variant font-label-md text-label-md bg-surface-container-lowest px-3 py-1.5 rounded-full ring-1 ring-surface-container-highest">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              calendar_today
            </span>
            <span>{currentDate}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full transition-colors",
                isNotifOpen ? "bg-surface-container text-primary" : "hover:bg-surface-container-low text-on-surface-variant"
              )}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface-container-lowest animate-pulse"></span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-[45]" onClick={() => setIsNotifOpen(false)}></div>
                <div className="absolute right-0 top-12 mt-2 w-96 bg-surface-container-lowest rounded-lg shadow-xl ring-1 ring-surface-container-highest z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-low">
                    <span className="font-title-md text-title-md text-on-surface font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                      <button className="text-primary hover:text-secondary text-label-sm font-label-sm font-semibold transition-colors">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-on-surface-variant font-body-sm">
                        You're all caught up!
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => handleNotifClick(notif.link)}
                          className={clsx(
                            "px-4 py-3 border-b border-surface-container-highest hover:bg-surface-container-lowest/50 cursor-pointer transition-colors",
                            !notif.read && "bg-primary/5"
                          )}
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5">
                              {notif.type === 'alert' && <span className="material-symbols-outlined text-error text-[20px]">error</span>}
                              {notif.type === 'warning' && <span className="material-symbols-outlined text-secondary text-[20px]">warning</span>}
                              {notif.type === 'success' && <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>}
                              {notif.type === 'info' && <span className="material-symbols-outlined text-primary text-[20px]">info</span>}
                            </div>
                            <div className="flex-1 flex flex-col gap-0.5">
                              <div className="flex items-start justify-between gap-2">
                                <span className={clsx("font-title-sm text-title-sm", !notif.read ? "text-on-surface font-semibold" : "text-on-surface-variant")}>
                                  {notif.title}
                                </span>
                                <span className="text-[10px] text-on-surface-variant whitespace-nowrap">{notif.timestamp}</span>
                              </div>
                              <p className="font-body-sm text-body-sm text-on-surface-variant text-balance">
                                {notif.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-surface-container-highest text-center bg-surface-container-lowest">
                    <button className="text-primary hover:text-secondary text-label-md font-label-md font-semibold transition-colors">
                      View all activity
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-surface-container-highest">
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-surface-container hover:ring-primary transition-all cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq-YcXzfe5UKkE1m4GTHA39VTO0So9umUsSzzQGAGIdtBdD_IupKaVkOGK0yGu1vGYrt8qdGJHF37eO8mPdMt3S1-AttHOWLzLFRFWsaxHQ4GwvUIF8U0DaadHTH4OdYPgP9gfrECJMtprVXIWfpMLiXawzf3h3Bg9mZE5QM9M0yXTSQQbZPqjZadRS8DYIb052RKkoPid8i1Nkd9TCwDq_S0Hrvg3957zgOdJattCDERvsP9FnoK0uQ"
            />
            <div className="hidden 2xl:flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface leading-tight font-semibold">
                Ali Raza
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                General Manager
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
