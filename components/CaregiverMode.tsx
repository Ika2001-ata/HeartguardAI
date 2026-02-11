
import React from 'react';
import { Vitals } from '../types';

const CaregiverMode: React.FC<{ vitals: Vitals }> = ({ vitals }) => {
  return (
    <div className="grid grid-cols-12 gap-8">
       <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card p-8 text-center flex flex-col items-center">
             <div className="relative mb-6">
                <img src="https://picsum.photos/seed/patient/200/200" className="w-32 h-32 rounded-[40px] border-4 border-white/5 shadow-2xl" alt="Patient" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-[#020408] rounded-full"></div>
             </div>
             <h2 className="text-2xl font-black text-white uppercase tracking-tight">Robert Chen</h2>
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Status: Resting</span>
             
             <div className="grid grid-cols-2 gap-8 mt-8 text-left w-full border-t border-white/5 pt-8">
                <div>
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Blood Type</span>
                   <span className="text-xs font-bold text-white">O Negative</span>
                </div>
                <div>
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Age</span>
                   <span className="text-xs font-bold text-white">68 Years</span>
                </div>
             </div>

             <div className="flex flex-col gap-3 w-full mt-10">
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 text-xs">
                   <i className="fa-solid fa-phone"></i>
                   Voice Call
                </button>
                <button className="w-full py-4 bg-red-600/20 border border-red-600/30 hover:bg-red-600/40 text-red-500 font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 text-xs">
                   <i className="fa-solid fa-truck-medical"></i>
                   Emergency EMS
                </button>
             </div>
          </div>
       </div>

       <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-3 gap-6">
             <CaregiverMetric label="Heart Rate" value={vitals.heartRate} unit="BPM" color="red" />
             <MetricBox label="Oxygen" value={vitals.spo2} unit="%" />
             <MetricBox label="Temp" value={vitals.temperature} unit="°C" />
          </div>

          <div className="glass-card p-6 min-h-[300px]">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Patient Location</h3>
             <div className="h-64 rounded-3xl overflow-hidden grayscale opacity-40 relative border border-white/5">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Map" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center pulse-red">
                      <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
                   </div>
                </div>
             </div>
             <p className="mt-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">North Wing, Apt 4B • Last Ping: 2s ago</p>
          </div>
       </div>
    </div>
  );
};

const CaregiverMetric = ({ label, value, unit, color }: any) => (
  <div className="glass-card p-6 border-white/5 text-center">
     <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-2">{label}</span>
     <span className={`text-2xl font-black text-${color}-500`}>{value}<span className="text-xs ml-1 opacity-50">{unit}</span></span>
  </div>
);

const MetricBox = ({ label, value, unit }: any) => (
  <div className="glass-card p-6 border-white/5 text-center">
     <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-2">{label}</span>
     <span className="text-2xl font-black text-white">{value}<span className="text-xs ml-1 opacity-50">{unit}</span></span>
  </div>
);

export default CaregiverMode;
