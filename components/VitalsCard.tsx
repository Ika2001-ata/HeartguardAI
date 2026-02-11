
import React from 'react';

interface VitalsCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: string;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  range: string;
}

const VitalsCard: React.FC<VitalsCardProps> = ({ label, value, unit, icon, color, trend, range }) => {
  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02] hover:bg-slate-800/80 cursor-default group">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl bg-opacity-10 bg-${color}-500 text-${color}-500`}>
          <i className={`fa-solid ${icon} text-lg`}></i>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</span>
          <div className="flex items-center gap-1 mt-1">
            {trend === 'up' && <i className="fa-solid fa-arrow-up text-emerald-500 text-[10px]"></i>}
            {trend === 'down' && <i className="fa-solid fa-arrow-down text-red-500 text-[10px]"></i>}
            <span className="text-xs text-slate-400">{range}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white group-hover:text-red-400 transition-colors">{value}</span>
        <span className="text-sm text-slate-500">{unit}</span>
      </div>
    </div>
  );
};

export default VitalsCard;
