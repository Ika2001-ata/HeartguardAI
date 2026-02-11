
import React from 'react';
import { AppState } from '../types';

interface SidebarProps {
  activeView: AppState;
  onViewChange: (view: AppState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: AppState.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: AppState.ECG_HISTORY, label: 'ECG History', icon: 'fa-wave-square' },
    { id: AppState.ANALYTICS, label: 'Analytics', icon: 'fa-microscope' },
    { id: AppState.CAREGIVER, label: 'Caregiver Mode', icon: 'fa-user-shield' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-[#0d1117]/80 backdrop-blur-xl border-r border-white/5 flex flex-col py-8 z-20">
      <div className="px-6 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-heart-pulse text-cyan-400 text-xl"></i>
        </div>
        <span className="hidden lg:block text-lg font-black tracking-tighter text-white uppercase italic">HeartGuard</span>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
              activeView === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 flex justify-center`}></i>
            <span className="hidden lg:block font-bold text-sm tracking-wide">{item.label}</span>
            {activeView === item.id && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 glow-cyan"></div>}
          </button>
        ))}

        <div className="my-6 border-t border-white/5 mx-3"></div>
        <span className="hidden lg:block px-4 mb-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">System</span>

        <button 
          onClick={() => onViewChange(AppState.SETTINGS)}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-500 hover:text-slate-200 group"
        >
          <i className="fa-solid fa-sliders text-lg w-6 flex justify-center"></i>
          <span className="hidden lg:block font-bold text-sm tracking-wide">Settings</span>
        </button>
      </nav>

      <div className="px-4 mt-auto">
        <div className="glass-panel p-3 border-white/10 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://picsum.photos/seed/alex/100/100" className="w-10 h-10 rounded-lg border border-white/20 grayscale group-hover:grayscale-0 transition-all" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0d1117] rounded-full"></div>
            </div>
            <div className="hidden lg:flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate">Alex Johnson</span>
              <span className="text-[10px] text-slate-500 truncate">Device: Armband v2.4</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
