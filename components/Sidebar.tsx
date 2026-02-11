
import React from 'react';
import { AppState } from '../types';

interface SidebarProps {
  activeView: AppState;
  onViewChange: (view: AppState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: AppState.DASHBOARD, label: 'Home', icon: 'fa-house' },
    { id: AppState.HISTORY, label: 'History', icon: 'fa-clock-rotate-left' },
    { id: AppState.CAREGIVER, label: 'Caregiver', icon: 'fa-user-nurse' },
    { id: AppState.SETTINGS, label: 'Settings', icon: 'fa-gear' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-[#0d1117]/80 backdrop-blur-xl border-r border-white/5 flex flex-col py-8 z-50">
      <div className="px-6 mb-12 flex items-center gap-4">
        <div className="neural-core">
          <div className="w-2 h-2 bg-white rounded-full glow-cyan"></div>
        </div>
        <span className="hidden lg:block text-xl font-black tracking-tighter text-white uppercase italic">HeartGuard</span>
      </div>

      <nav className="flex-1 flex flex-col gap-3 px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
              activeView === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 flex justify-center`}></i>
            <span className="hidden lg:block font-black text-xs uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-6 mt-auto">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <i className="fa-solid fa-headset text-xs"></i>
              </div>
              <span className="hidden lg:block text-[9px] font-black text-slate-500 uppercase tracking-widest">Support</span>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
