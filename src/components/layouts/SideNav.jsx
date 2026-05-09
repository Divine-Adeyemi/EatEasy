import React, { useState, createContext, useContext } from 'react';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarContext = createContext();

export default function SideNav({ children }) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const username = location.state?.username || "User"; 
  const initial = username.charAt(0).toUpperCase();

  return (
    <aside className="h-full z-50 overflow-visible">
      <nav className={`
        h-full flex flex-col 
        bg-[var(--bg-secondary)] border-r border-[var(--border-color)] shadow-2xl
        transition-all duration-300 ease-in-out relative
        ${expanded ? 'w-72' : 'w-24'}
      `}>
        
        <div className="p-6 flex items-center justify-center relative">
          <h1 className={`
            font-bold text-2xl text-[var(--text-primary)] tracking-wide
            overflow-hidden transition-all duration-300 whitespace-nowrap
            ${expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}
          `}>
            Eat<span className="text-[var(--tertiary-700)]">Easy</span>
          </h1>

          <button 
            onClick={() => setExpanded(curr => !curr)}
            className={`
                hidden md:block 
                absolute -right-3 top-8 z-50
                p-1.5 rounded-full 
                bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-lg
                hover:text-white hover:bg-[var(--tertiary-700)] hover:border-[var(--tertiary-700)] 
                transition-all
            `}
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <div className={`
            flex items-center gap-4 px-6 py-6 mb-2
            transition-all duration-300 
            ${expanded ? 'justify-start' : 'justify-center'}
        `}>
             <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--neutral-200)] dark:bg-[var(--neutral-700)] border-2 border-[var(--border-color)] flex items-center justify-center overflow-hidden">
                <span className="text-xl font-bold text-[var(--text-primary)]">{initial}</span>
             </div>

             <div className={`
                flex flex-col overflow-hidden transition-all duration-300
                ${expanded ? 'w-40 opacity-100 ml-2' : 'w-0 opacity-0 ml-0'}
             `}>
                <h4 className="font-bold text-[var(--text-primary)] whitespace-nowrap">{username}</h4>
                <p className="text-xs text-[var(--neutral-500)] cursor-pointer hover:text-[var(--tertiary-700)] underline transition-all">View Profile</p>
             </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <ul className="flex-1 px-4 py-4 space-y-4 overflow-y-auto no-scrollbar">
            {children}
          </ul>
        </SidebarContext.Provider>

        <div className="p-6 pb-8 bg-[var(--bg-secondary)]">
            <li 
                onClick={() => navigate('/')}
                className={`
                    relative flex items-center py-3 px-4 rounded-xl cursor-pointer
                    group transition-colors bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] hover:bg-[var(--neutral-200)] dark:hover:bg-[var(--neutral-700)]
                    ${expanded ? 'justify-start' : 'justify-center'}
                `}
            >
                <LogOut size={20} className="text-[var(--text-primary)] opacity-70 group-hover:opacity-100 transition-colors" />
                <span className={`
                    overflow-hidden transition-all duration-300 font-medium whitespace-nowrap text-[var(--text-primary)]
                    ${expanded ? 'w-40 ml-4 opacity-100' : 'w-0 ml-0 opacity-0'}
                `}>
                    Logout
                </span>
            </li>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li 
        onClick={onClick}
        className={`
        relative flex items-center py-3 px-3
        font-medium rounded-xl cursor-pointer
        transition-colors group
        ${active ? "bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)]" : "hover:bg-transparent"}
        ${expanded ? 'justify-start' : 'justify-center'}
    `}>
      <div className={`
        p-2.5 rounded-xl transition-all duration-300
        ${active 
            ? 'bg-[var(--primary-600)] text-white shadow-lg' 
            : 'bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] text-[var(--text-primary)] group-hover:bg-[var(--neutral-200)] dark:group-hover:bg-[var(--neutral-700)]'
        }
      `}>
        {icon}
      </div>
      <span className={`
        overflow-hidden transition-all duration-300 whitespace-nowrap
        ${expanded ? 'w-40 ml-4 opacity-100' : 'w-0 ml-0 opacity-0'}
        ${active ? 'text-[var(--primary-600)] dark:text-[var(--primary-500)] font-bold' : 'text-[var(--text-primary)] opacity-70'}
      `}>
        {text}
      </span>
    </li>
  );
}

export function SidebarFolder({ icon, text, active, children }) {
    const { expanded } = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(active); 

    const toggleOpen = () => {
        if (!expanded) return; 
        setIsOpen(!isOpen);
    };

    return (
        <li className="flex flex-col relative">
            <div 
                onClick={toggleOpen}
                className={`
                    relative flex items-center py-3 px-3 cursor-pointer z-10
                    ${expanded ? 'justify-start' : 'justify-center'}
                `}
            >
                <div className={`
                    p-2.5 rounded-xl transition-all duration-300 relative z-20 shrink-0
                    ${active || isOpen
                        ? 'bg-[var(--secondary-800)] text-white shadow-[0_0_15px_rgba(250,163,0,0.4)]' 
                        : 'bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] text-[var(--text-primary)]'
                    }
                `}>
                    {icon}
                </div>
                <span className={`
                    overflow-hidden transition-all duration-300 whitespace-nowrap ml-4
                    ${expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}
                    ${active || isOpen ? 'text-[var(--secondary-800)] font-bold' : 'text-[var(--text-primary)] opacity-70'}
                `}>
                    {text}
                </span>
            </div>

            <div className={`
                absolute left-[29px] top-12 w-[2px] rounded-full bg-[var(--secondary-800)] opacity-80
                transition-all duration-500 ease-in-out
                ${expanded && isOpen ? 'h-[calc(100%-60px)]' : 'h-0'}
            `}></div>

            <div className={`
                grid transition-[grid-template-rows] duration-500 ease-in-out
                ${isOpen && expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
            `}>
                <ul className="overflow-hidden">
                   {children}
                </ul>
            </div>
        </li>
    );
}

export function SidebarSubItem({ text, active, onClick }) {
    return (
        <li 
            onClick={onClick}
            className={`
                relative flex items-center py-3 pl-[70px] pr-3
                text-sm cursor-pointer transition-all
                ${active 
                    ? 'text-[var(--secondary-800)] font-bold' 
                    : 'text-[var(--text-primary)] opacity-60 hover:opacity-100'
                }
            `}
        >
            {text}
        </li>
    );
}

export function SidebarSection({ title }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <div className={`
            text-[var(--neutral-500)] text-[10px] font-bold uppercase mt-4 mb-1 px-3 tracking-widest
            transition-all duration-300 overflow-hidden whitespace-nowrap
            ${expanded ? 'opacity-100 h-auto' : 'opacity-0 h-0'}
        `}>
            {title}
        </div>
    );
}