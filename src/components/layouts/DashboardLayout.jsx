import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react'; 
import SideNav, { SidebarItem, SidebarSection, SidebarFolder, SidebarSubItem } from './SideNav'; 
import { ShoppingBag, MapPin, Clock, HelpCircle, Gift } from 'lucide-react';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const isFolderActive = (paths) => paths.includes(location.pathname);

  const handleNavigation = (path) => {
    navigate(path, { state: location.state });
    setIsMobileMenuOpen(false); 
  };

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-transparent h-16 px-6 flex items-center justify-start pointer-events-none">
         <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="pointer-events-auto p-2 text-[var(--text-primary)] hover:bg-[var(--neutral-200)] dark:hover:bg-[var(--neutral-700)] rounded-lg"
         >
            <Menu size={28} />
         </button>
      </div>

      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 h-full
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:flex
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         <SideNav>
            <SidebarSection title="Menu" />
            <SidebarFolder 
                icon={<ShoppingBag size={20} />} 
                text="Food Menu" 
                active={isFolderActive(['/dashboard', '/smart-assistant', '/full-menu'])}
            >
                <SidebarSubItem 
                    text="Smart Assistant" 
                    active={isActive('/smart-assistant')}
                    onClick={() => handleNavigation('/smart-assistant')}
                />
                 <SidebarSubItem 
                    text="Full Menu" 
                    active={isActive('/dashboard')} 
                    onClick={() => handleNavigation('/dashboard')}
                />
            </SidebarFolder>

            <SidebarItem 
                icon={<Clock size={20} />} 
                text="Order History" 
                active={isActive('/order-history')}
                onClick={() => handleNavigation('/order-history')}
            />
            <SidebarItem 
                icon={<MapPin size={20} />} 
                text="Locations" 
                active={isActive('/locations') || isActive('/setlocation')}
                onClick={() => handleNavigation('/locations')}
            />

            <SidebarSection title="General" />
            <SidebarItem icon={<Gift size={20} />} text="My Rewards" active={isActive('/rewards')} onClick={() => handleNavigation('/rewards')} />
            <SidebarItem icon={<HelpCircle size={20} />} text="Help" active={isActive('/help')} onClick={() => handleNavigation('/help')} />
         </SideNav>
      </div>

      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0 bg-[var(--bg-primary)]">
        <Outlet />
      </main>
    </div>
  );
}