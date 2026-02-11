
import React from 'react';
import { Vitals } from '../types';

const CaregiverMode: React.FC<{ vitals: Vitals }> = ({ vitals }) => {
  return (
    <div className="grid grid-cols-12 gap-6 pb-10">
       <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 border-white/10 text-center flex flex-col items-center">
             <div className="relative mb-6">
                <img src="https://picsum.photos/seed/patient/200/200" className="w-32 h-32 rounded-3xl border-2 border-cyan-500/30" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 border-4 border-[#0d1117] rounded-full"></div>
             </div>
             <h2 className="text-2xl font-black text-white uppercase tracking-tight">Robert Chen</h2>
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Patient ID: #HEART-2024-08</span>
             
             <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8 text-left w-full border-t border-white/5 pt-6">
                <DetailItem label="Age / Gender" value="68 / Male" />
                <DetailItem label="Blood Type" value="O Negative" />
                <DetailItem label="Condition" value="Atrial Fibrillation" />
             </div>

             <div className="flex flex-col gap-3 w-full mt-8">
                <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-[#05070a] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                   <i className="fa-solid fa-phone"></i>
                   Call Patient
                </button>
                <button className="w-full py-4 bg-red-600/10 border border-red-600/30 hover:bg-red-600/20 text-red-500 font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                   <i className="fa-solid fa-truck-medical"></i>
                   Call 911 / EMS
                </button>
             </div>
          </div>

          <div className="glass-panel border-white/10 p-6">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                   <i className="fa-solid fa-location-dot text-cyan-400"></i>
                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">Current Location</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Live</span>
             </div>
             <div className="h-48 bg-slate-900 rounded-xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-4 border-cyan-500/20 pulse-red">
                      <i className="fa-solid fa-user text-white text-[10px]"></i>
                   </div>
                </div>
             </div>
             <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                123 Oakwood Dr, North Wing, Apt 4B
             </div>
          </div>
       </div>

       <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
             <MiniVital label="Heart Rate" value={vitals.heartRate} unit="BPM" status="STABLE" />
             <MiniVital label="SpO2" value={vitals.spo2} unit="%" status="STABLE" />
             <MiniVital label="Body Temp" value={vitals.temperature} unit="°C" status="NORMAL" />
          </div>

          <div className="glass-panel p-6 border-white/10 h-[400px] flex flex-col">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">Live ECG Stream</h3>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                   <span className="text-[10px] font-bold text-slate-500">Real-time cardiovascular telemetry</span>
                </div>
             </div>
             <div className="flex-1 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 ecg-grid opacity-10"></div>
                {/* Simulated ECG component used here as well for consistency */}
                <div className="w-full h-full opacity-60">
                   <svg className="w-full h-full stroke-cyan-500 fill-none" viewBox="0 0 800 200">
                      <path d="M0 100 L200 100 L210 50 L230 150 L240 100 L400 100 L410 50 L430 150 L440 100 L600 100 L610 50 L630 150 L640 100 L800 100" strokeWidth="2" strokeDasharray="10" />
                   </svg>
                </div>
             </div>
          </div>

          <div className="glass-panel border-white/10">
             <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Recent Alerts</span>
                <span className="text-[9px] font-mono text-slate-500">24H LOG</span>
             </div>
             <div className="p-4 space-y-4">
                <AlertEntry 
                  type="CRITICAL HEART ALERT" 
                  msg="Tachycardia detected (180 BPM)" 
                  time="08:42 AM" 
                  color="red"
                />
                <AlertEntry 
                  type="LOW SPO2 LEVEL" 
                  msg="Saturation dropped to 92% (45s duration)" 
                  time="06:15 AM" 
                  color="amber"
                />
                <AlertEntry 
                  type="ROUTINE CHECK" 
                  msg="Daily vitals summary generated" 
                  time="Yesterday" 
                  color="cyan"
                />
             </div>
          </div>
       </div>
    </div>
  );
};

const DetailItem = ({ label, value }: any) => (
  <div>
    <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-xs font-bold text-slate-300">{value}</div>
  </div>
);

const MiniVital = ({ label, value, unit, status }: any) => (
  <div className="glass-panel p-4 border-white/10 flex flex-col items-center">
     <div className="flex items-center gap-2 mb-2">
        <i className="fa-solid fa-heart text-red-500 text-[10px]"></i>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
     </div>
     <div className="text-2xl font-black text-white">{value}<span className="text-[10px] ml-1 text-slate-500">{unit}</span></div>
     <span className="text-[8px] font-black text-emerald-500 uppercase mt-2">{status}</span>
  </div>
);

const AlertEntry = ({ type, msg, time, color }: any) => {
  const borderColors: any = { red: 'border-red-500/30', amber: 'border-amber-500/30', cyan: 'border-cyan-500/30' };
  const textColors: any = { red: 'text-red-500', amber: 'text-amber-500', cyan: 'text-cyan-500' };

  return (
    <div className={`p-4 border-l-4 ${borderColors[color]} bg-white/5 flex justify-between items-center group hover:bg-white/10 transition-all`}>
       <div>
          <h4 className={`text-[10px] font-black uppercase tracking-widest ${textColors[color]}`}>{type}</h4>
          <p className="text-xs text-slate-300 mt-1">{msg}</p>
       </div>
       <div className="text-right">
          <div className="text-[9px] text-slate-600 font-mono">{time}</div>
          <button className="text-[9px] font-bold text-cyan-400 uppercase mt-1 hover:underline">Details</button>
       </div>
    </div>
  );
}

export default CaregiverMode;
