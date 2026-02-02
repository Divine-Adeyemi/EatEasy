import React, { useState, createContext, useContext } from 'react';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarContext = createContext();

export default function SideNav({ children }) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  const username = location.state?.username || "Robert Fox"; 
  const initial = username.charAt(0).toUpperCase();

  return (
    // overflow-visible is REQUIRED for the chevron button to hang outside
    <aside className="h-full z-50 overflow-visible">
      <nav className={`
        h-full flex flex-col 
        bg-[#1F1D2B] border-r border-[#2D2B3A] shadow-2xl
        transition-all duration-300 ease-in-out relative
        ${expanded ? 'w-72' : 'w-24'}
      `}>
        
        {/* 1. HEADER */}
        <div className="p-6 flex items-center justify-center relative">
          <h1 className={`
            font-bold text-2xl text-white tracking-wide
            overflow-hidden transition-all duration-300 whitespace-nowrap
            ${expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}
          `}>
            Eat<span className="text-[#F97316]">Easy</span>
          </h1>

          {/* --- DESKTOP TOGGLE BUTTON (The Chevrons) --- */}
          {/* hidden md:block = Hides on mobile. */}
          {/* absolute -right-3 = Protrudes outside. */}
          <button 
            onClick={() => setExpanded(curr => !curr)}
            className={`
                hidden md:block 
                absolute -right-3 top-8 z-50
                p-1.5 rounded-full 
                bg-[#252836] text-gray-400 border border-[#2D2B3A] shadow-lg
                hover:text-white hover:bg-[#F97316] hover:border-[#F97316] 
                transition-all
            `}
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* 2. USER PROFILE */}
        <div className={`
            flex items-center gap-4 px-6 py-6 mb-2
            transition-all duration-300 
            ${expanded ? 'justify-start' : 'justify-center'}
        `}>
             <div className="w-12 h-12 shrink-0 rounded-full bg-[#252836] border-2 border-[#252836] flex items-center justify-center overflow-hidden">
                <span className="text-xl font-bold text-white">{initial}</span>
             </div>

             <div className={`
                flex flex-col overflow-hidden transition-all duration-300
                ${expanded ? 'w-40 opacity-100 ml-2' : 'w-0 opacity-0 ml-0'}
             `}>
                <h4 className="font-bold text-white whitespace-nowrap">{username}</h4>
                <p className="text-xs text-gray-400 cursor-pointer hover:text-[#F97316] underline decoration-gray-500 hover:decoration-[#F97316] transition-all">View Profile</p>
             </div>
        </div>

        {/* 3. NAVIGATION ITEMS */}
        <SidebarContext.Provider value={{ expanded }}>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <ul className="flex-1 px-4 py-4 space-y-4 overflow-y-auto no-scrollbar">
            {children}
          </ul>
        </SidebarContext.Provider>

        {/* 4. LOGOUT */}
        <div className="p-6 pb-8 bg-[#1F1D2B]">
            <li 
                onClick={() => navigate('/')}
                className={`
                    relative flex items-center py-3 px-4 rounded-xl cursor-pointer
                    group transition-colors bg-[#252836] hover:bg-[#2d303e]
                    ${expanded ? 'justify-start' : 'justify-center'}
                `}
            >
                <LogOut size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                <span className={`
                    overflow-hidden transition-all duration-300 font-medium whitespace-nowrap text-gray-300 group-hover:text-white
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

// =========================================================
// COMPONENT: REGULAR ITEM
// =========================================================
export function SidebarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li 
        onClick={onClick}
        className={`
        relative flex items-center py-3 px-3
        font-medium rounded-xl cursor-pointer
        transition-colors group
        ${active ? "bg-[#252836]" : "hover:bg-transparent"}
        ${expanded ? 'justify-start' : 'justify-center'}
    `}>
      <div className={`
        p-2.5 rounded-xl transition-all duration-300
        ${active 
            ? 'bg-[#252836] border border-gray-600 text-white' 
            : 'bg-[#252836] text-gray-400 group-hover:text-white'
        }
      `}>
        {icon}
      </div>
      <span className={`
        overflow-hidden transition-all duration-300 whitespace-nowrap
        ${expanded ? 'w-40 ml-4 opacity-100' : 'w-0 ml-0 opacity-0'}
        ${active ? 'text-white font-bold' : 'text-gray-400'}
      `}>
        {text}
      </span>
    </li>
  );
}

// =========================================================
// COMPONENT: FOLDER (Matches your Yellow/Orange Design)
// =========================================================
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
                {/* Yellow Icon Box */}
                <div className={`
                    p-2.5 rounded-xl transition-all duration-300 relative z-20 shrink-0
                    ${active || isOpen
                        ? 'bg-[#FFCA40] text-white shadow-[0_0_15px_rgba(255,202,64,0.4)]' 
                        : 'bg-[#252836] text-gray-400 hover:text-white'
                    }
                `}>
                    {icon}
                </div>
                {/* Yellow Text */}
                <span className={`
                    overflow-hidden transition-all duration-300 whitespace-nowrap ml-4
                    ${expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}
                    ${active || isOpen ? 'text-[#FFCA40] font-bold' : 'text-gray-400'}
                `}>
                    {text}
                </span>
            </div>

            {/* The Yellow Vertical Line */}
            <div className={`
                absolute left-[29px] top-12 w-[2px] rounded-full bg-[#FFCA40] opacity-80
                transition-all duration-500 ease-in-out
                ${expanded && isOpen ? 'h-[calc(100%-60px)]' : 'h-0'}
            `}></div>

            {/* Sub Items */}
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
                hover:text-white
                ${active 
                    ? 'text-white font-bold' 
                    : 'text-gray-400'
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
            text-gray-500 text-[10px] font-bold uppercase mt-4 mb-1 px-3 tracking-widest
            transition-all duration-300 overflow-hidden whitespace-nowrap
            ${expanded ? 'opacity-100 h-auto' : 'opacity-0 h-0'}
        `}>
            {title}
        </div>
    );
}