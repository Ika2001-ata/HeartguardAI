
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
    <div className="grid grid-cols-12 gap-8">
      {/* Device Status */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="glass-card p-0 border-cyan-500/20 overflow-hidden group flex flex-col shadow-2xl">
          <div className="p-6 pb-2">
            <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Smart Armband</h3>
            <p className="text-[9px] text-slate-500 font-mono mt-1 uppercase">Signal: Excellent</p>
          </div>
          
          <div className="relative aspect-square w-full bg-black flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800" 
              alt="Armband" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <span className="block text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Pulse</span>
                <span className="text-5xl font-black text-white glow-cyan tracking-tighter">{vitals.heartRate} <span className="text-xl text-slate-500 font-normal">BPM</span></span>
              </div>
              <div className="w-14 h-14 rounded-full border border-cyan-500/30 flex items-center justify-center bg-black/60 backdrop-blur-md">
                 <i className="fa-solid fa-heart text-cyan-400 text-xl animate-pulse"></i>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="block text-[8px] text-slate-500 uppercase font-black mb-1">Battery</span>
                <span className="text-xs font-mono font-bold text-emerald-500 tracking-widest">84%</span>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="block text-[8px] text-slate-500 uppercase font-black mb-1">Sync</span>
                <span className="text-xs font-mono font-bold text-cyan-500 tracking-widest">Live</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricSmall label="Oxygen" value={vitals.spo2} unit="%" color="cyan" />
          <MetricSmall label="Temp" value={vitals.temperature} unit="°C" color="blue" />
        </div>

        <button 
          onClick={triggerAnalysis}
          disabled={isAnalyzing}
          className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-3xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,242,255,0.2)]"
        >
          {isAnalyzing ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-sparkles"></i>}
          {isAnalyzing ? 'Scanning...' : 'Smart Heart Scan'}
        </button>
      </div>

      {/* Main Analytics */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="glass-card h-[460px] relative overflow-hidden flex flex-col bg-black/40">
          <div className="p-6 border-b border-white/5 flex items-center justify-between z-10 backdrop-blur-md">
             <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Live Heart Rhythm</span>
             <span className="text-[9px] font-mono text-slate-600 uppercase">Lead II Waveform</span>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center bg-[#010204]">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,242,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
            <ECGStream vitals={vitals} />
          </div>

          <div className="p-6 border-t border-white/5 bg-black/60 flex items-center justify-between z-10">
             <div className="flex gap-10">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Blood Pressure</span>
                  <span className="text-sm font-bold text-white tracking-tighter">{vitals.bloodPressureSys}/{vitals.bloodPressureDia} <span className="text-[10px] text-slate-500">mmHg</span></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-sm font-bold text-emerald-500 tracking-tighter">HEALTHY</span>
                </div>
             </div>
          </div>
        </div>

        {/* Blood Flow Visual */}
        <div className="glass-card p-6 border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-droplet text-cyan-500 text-xs"></i>
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Blood Flow Scan</h4>
          </div>
          <div className="h-24 rounded-2xl overflow-hidden border border-white/5 relative bg-black/40">
            <HemodynamicAnalysis vitals={vitals} />
          </div>
        </div>

        {aiReport && (
          <div className="glass-card p-8 border-cyan-500/30 bg-cyan-500/5 animate-fadeIn">
            <div className="flex items-center gap-6 mb-8">
               <div className={`w-16 h-16 rounded-3xl border-2 ${aiReport.riskScore > 40 ? 'border-red-500/40' : 'border-emerald-500/40'} flex items-center justify-center bg-black/40 shadow-inner`}>
                  <span className={`text-2xl font-black ${aiReport.riskScore > 40 ? 'text-red-500' : 'text-emerald-500'}`}>{aiReport.riskScore}%</span>
               </div>
               <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">AI Health Insight</h3>
                  <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">Scan Log: {new Date().toLocaleTimeString()}</p>
               </div>
            </div>
            
            <p className="p-6 bg-black/40 rounded-3xl border border-white/5 italic text-sm text-slate-300 leading-relaxed mb-8">
              "{aiReport.diagnosis}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
               {aiReport.recommendations.map((rec, i) => (
                 <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
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

const MetricSmall = ({ label, value, unit, color }: any) => (
  <div className="glass-card p-5 border-white/5 hover:bg-white/5 transition-all">
    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">{label}</span>
    <div className="flex items-baseline gap-1">
       <span className="text-2xl font-black text-white">{value}</span>
       <span className="text-[10px] text-slate-600 font-bold uppercase">{unit}</span>
    </div>
  </div>
);

export default Dashboard;
