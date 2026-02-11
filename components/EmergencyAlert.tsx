
import React from 'react';
import { Vitals } from '../types';

interface EmergencyAlertProps {
  vitals: Vitals;
  onDismiss: () => void;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ vitals, onDismiss }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a0505]/80 backdrop-blur-2xl animate-fadeIn">
      <div className="max-w-4xl w-full alert-card rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(255,59,48,0.4)] animate-scaleUp">
        {/* Banner Header (Directly from Image 5) */}
        <div className="bg-[#ff3b30] px-8 py-7 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
             <i className="fa-solid fa-triangle-exclamation text-2xl animate-pulse"></i>
             <h1 className="text-2xl font-black uppercase tracking-[0.1em]">Critical Heart Alert</h1>
          </div>
          <div className="text-right font-mono text-[10px] leading-tight opacity-90">
            <div>ID: HR-9921-X</div>
            <div>TS: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-10">
          {/* DEVICE PHOTO - Using Image 1 (Red Dome) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="rounded-3xl overflow-hidden border border-red-500/20 bg-black aspect-[3/4] relative shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover opacity-90"
                  alt="Armband Alert State"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-[8px] font-black uppercase rounded-full shadow-lg">Alert Mode</div>
                
                {/* Simulated Screen Overlay from Image 5 */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md rounded-2xl border border-red-500/30 text-center">
                   <div className="text-xs font-black text-red-500 uppercase mb-1">Live HR</div>
                   <div className="text-3xl font-black text-white leading-none tracking-tighter">{vitals.heartRate}</div>
                   <div className="text-[8px] font-bold text-slate-500 uppercase mt-2">BPM</div>
                </div>
             </div>
             
             <div className="glass-card p-4 border-red-500/10 bg-black/40 relative">
               <span className="text-[9px] font-mono text-red-500/60 uppercase tracking-widest block mb-2">Lead II Snapshot</span>
               <div className="h-20 flex items-center justify-center">
                 <svg className="w-full h-full stroke-red-500 fill-none glow-red" viewBox="0 0 200 60">
                    <path d="M0 30 L50 30 L55 10 L65 50 L70 30 L100 30 L105 5 L115 55 L120 30 L150 30 L155 10 L165 50 L170 30 L200 30" strokeWidth="2" />
                 </svg>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
             {/* Precaution Box (Directly from Image 5) */}
             <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                      <i className="fa-solid fa-circle-info"></i>
                   </div>
                   <h3 className="text-lg font-bold text-red-100 tracking-tight">Immediate Precautions</h3>
                </div>
                <div className="space-y-6 flex-1">
                   <PrecautionItem num="1" title="Contact Emergency Services" desc="Dial emergency response immediately or use the button below." />
                   <PrecautionItem num="2" title="Sit or Lie Down Immediately" desc="Rest in a comfortable position and try to remain calm." />
                   <PrecautionItem num="3" title="Monitor Symptoms" desc="Watch for chest pain, shortness of breath, or dizziness." />
                </div>

                <div className="mt-10 flex flex-col gap-4">
                  <button className="w-full py-6 bg-[#ff3b30] hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl flex items-center justify-center gap-4 transition-all shadow-[0_15px_40px_rgba(255,59,48,0.4)]">
                    <i className="fa-solid fa-phone-flip animate-bounce"></i>
                    Call Emergency Services (911)
                  </button>
                  <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-4 transition-all border border-white/5">
                    <i className="fa-solid fa-user-group"></i>
                    Notify Caregivers
                  </button>
                  <div className="flex justify-center">
                    <button onClick={onDismiss} className="text-slate-600 text-[9px] uppercase font-black tracking-[0.3em] mt-2 hover:text-red-400 transition-all cursor-pointer">
                        Dismiss False Detection
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="bg-black/60 border-t border-white/5 px-10 py-5 flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          <div className="flex gap-6">
             <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Sensor Link Active</span>
             <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> GPS Location Locked</span>
          </div>
          <div className="font-bold">HeartGuard Pro v4.2.0</div>
        </div>
      </div>
    </div>
  );
};

const PrecautionItem = ({ num, title, desc }: any) => (
  <div className="flex gap-5">
    <div className="w-10 h-10 rounded-full bg-[#ff3b30] text-white flex-shrink-0 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(255,59,48,0.4)]">{num}</div>
    <div>
      <h4 className="font-bold text-red-100 text-[15px] tracking-tight">{title}</h4>
      <p className="text-xs text-red-200/40 leading-relaxed mt-1.5">{desc}</p>
    </div>
  </div>
);

export default EmergencyAlert;
