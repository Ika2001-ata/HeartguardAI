
import React, { useState } from 'react';
import { Vitals, Recommendation } from '../types';
import ECGStream from './ECGStream';
import HemodynamicAnalysis from './HemodynamicAnalysis';
import { analyzeVitals } from '../services/geminiService';

const Dashboard: React.FC<{ vitals: Vitals }> = ({ vitals }) => {
  const [aiReport, setAiReport] = useState<{ riskScore: number; diagnosis: string; recommendations: Recommendation[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const triggerAnalysis = async () => {
    setIsAnalyzing(true);
    const report = await analyzeVitals(vitals);
    setAiReport(report);
    setIsAnalyzing(false);
  };

  return (
    <div className="grid grid-cols-12 gap-8 pb-20">
      {/* Device & Status Panel */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        
        <div className="glass-card p-0 border-cyan-500/20 overflow-hidden group flex flex-col shadow-2xl">
          <div className="p-6 pb-2 bg-gradient-to-b from-cyan-500/5 to-transparent">
            <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Armband Connected</h3>
            <p className="text-[9px] text-slate-500 font-mono mt-1 uppercase">Serial: HG-PRO-2025</p>
          </div>
          
          <div className="relative aspect-square w-full bg-[#020408] flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800" 
              alt="HeartGuard Wearable" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <span className="block text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Live Pulse</span>
                <span className="text-5xl font-black text-white glow-cyan">{vitals.heartRate}</span>
              </div>
              <div className="w-14 h-14 rounded-full border border-cyan-500/30 flex items-center justify-center bg-black/60 backdrop-blur-md">
                 <i className="fa-solid fa-heart text-cyan-400 text-xl animate-pulse"></i>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4">
             <StatusBox label="Charge" value="84%" icon="fa-bolt" color="emerald" />
             <StatusBox label="Link" value="2.1ms" icon="fa-wifi" color="cyan" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Oxygen" value={vitals.spo2} unit="%" color="cyan" />
          <MetricCard label="Temp" value={vitals.temperature} unit="°C" color="blue" />
        </div>

        <button 
          onClick={triggerAnalysis}
          disabled={isAnalyzing}
          className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-3xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,210,255,0.2)]"
        >
          {isAnalyzing ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
          {isAnalyzing ? 'Scanning...' : 'Smart Heart Scan'}
        </button>
      </div>

      {/* Analytics & ECG Feed */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="glass-card h-[460px] relative overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between z-10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Real-Time Waveform</span>
               <div className="h-4 w-px bg-white/10"></div>
               <span className="text-[9px] font-mono text-slate-600">ENCRYPTED_TELEMETRY_LINK</span>
            </div>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center bg-[#010204]">
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}></div>
            <ECGStream vitals={vitals} />
          </div>

          <div className="p-6 border-t border-white/5 bg-black/60 flex items-center justify-between z-10">
             <div className="flex gap-10">
                <MiniVal label="Pressure" value={`${vitals.bloodPressureSys}/${vitals.bloodPressureDia}`} />
                <MiniVal label="State" value="NORMAL" color="emerald" />
             </div>
             <button className="text-[9px] font-black text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-all">
                Export Health Log
             </button>
          </div>
        </div>

        {/* Integrated Hemodynamic Visual */}
        <div className="glass-card p-6 border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-droplet text-cyan-500"></i>
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Flow Pattern Analysis</h4>
          </div>
          <div className="h-24 rounded-2xl overflow-hidden border border-white/5 relative bg-black/40">
            <HemodynamicAnalysis vitals={vitals} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[8px] font-mono text-cyan-500/30 uppercase tracking-[0.5em]">Steady Arterial Flow Locked</span>
            </div>
          </div>
        </div>

        {aiReport && (
          <div className="glass-card p-8 border-cyan-500/30 bg-cyan-500/5 animate-fadeIn">
            <div className="flex justify-between items-start mb-8">
               <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[22px] border-2 ${aiReport.riskScore > 40 ? 'border-red-500/40' : 'border-emerald-500/40'} flex items-center justify-center bg-black`}>
                     <span className={`text-2xl font-black ${aiReport.riskScore > 40 ? 'text-red-500' : 'text-emerald-500'}`}>{aiReport.riskScore}%</span>
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white uppercase tracking-tight">Smart Analysis Results</h3>
                     <p className="text-[10px] font-mono text-slate-500 mt-1">LATEST SCAN: {new Date().toLocaleTimeString()}</p>
                  </div>
               </div>
            </div>
            
            <p className="p-6 bg-black/60 rounded-3xl border border-white/5 italic text-sm text-slate-300 leading-relaxed mb-8">
              "{aiReport.diagnosis}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
               {aiReport.recommendations.map((rec, i) => (
                 <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all">
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-3 block">{rec.category}</span>
                    <h4 className="text-sm font-bold text-white mb-2">{rec.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{rec.description}</p>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBox = ({ label, value, icon, color }: any) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
    <i className={`fa-solid ${icon} text-${color}-500 text-xs`}></i>
    <div>
      <span className="block text-[8px] text-slate-500 uppercase font-black">{label}</span>
      <span className="text-xs font-mono font-bold text-white">{value}</span>
    </div>
  </div>
);

const MetricCard = ({ label, value, unit, color }: any) => (
  <div className="glass-card p-5 border-white/5 hover:bg-white/5 transition-all">
    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">{label}</span>
    <div className="flex items-baseline gap-1">
       <span className="text-2xl font-black text-white">{value}</span>
       <span className="text-[10px] text-slate-600 font-bold uppercase">{unit}</span>
    </div>
  </div>
);

const MiniVal = ({ label, value, color = "slate-400" }: any) => (
  <div className="flex flex-col">
    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</span>
    <span className={`text-sm font-bold text-${color} tracking-tighter`}>{value}</span>
  </div>
);

export default Dashboard;
