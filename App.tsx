
import React, { useState, useEffect } from 'react';
import { AppState, Vitals } from './types';
import Dashboard from './components/Dashboard';
import EmergencyAlert from './components/EmergencyAlert';

const App: React.FC = () => {
  const [isAlertMode, setIsAlertMode] = useState(false);
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 72,
    bloodPressureSys: 118,
    bloodPressureDia: 75,
    spo2: 98,
    temperature: 36.5,
    timestamp: Date.now()
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => {
        const drift = Math.random() > 0.5 ? 1 : -1;
        let hr = prev.heartRate + drift;
        hr = Math.max(60, Math.min(hr, 105));

        // Occasional simulated critical alert
        if (Math.random() > 0.999) {
          hr = 180;
          setIsAlertMode(true);
        }

        return { ...prev, heartRate: hr, timestamp: Date.now() };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDismissAlert = () => {
    setIsAlertMode(false);
    setVitals(v => ({ ...v, heartRate: 72 }));
  };

  return (
    <div className="min-h-screen relative">
      <nav className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/40 backdrop-blur-2xl fixed top-0 w-full z-50">
        <div className="flex items-center gap-4">
          <div className="neural-core">
            <div className="w-2 h-2 bg-white rounded-full glow-cyan"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-widest text-white uppercase italic leading-none">
              HeartGuard<span className="text-cyan-400 font-normal">AI</span>
            </h1>
            <span className="text-[8px] font-mono text-cyan-500/60 uppercase tracking-[0.4em] mt-1">Uplink Stable</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <button className="text-cyan-400">Dashboard</button>
          <button className="hover:text-white transition-colors">History</button>
          <button className="hover:text-white transition-colors">Emergency Hub</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-black text-emerald-500 uppercase">Live Feed</span>
          </div>
          <div className="w-10 h-10 rounded-2xl overflow-hidden border border-white/10 p-0.5">
            <img src="https://picsum.photos/seed/user1/100/100" className="w-full h-full rounded-[14px] grayscale" />
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-8 relative z-10">
        {isAlertMode ? (
          <EmergencyAlert vitals={vitals} onDismiss={handleDismissAlert} />
        ) : (
          <Dashboard vitals={vitals} />
        )}
      </main>

      <footer className="py-10 text-center border-t border-white/5 opacity-40 text-[9px] font-mono uppercase tracking-[0.5em] relative z-10">
        SAFE_NODE_09 // PROTOCOL_V4.2 // SECURE_TELEMETRY
      </footer>
    </div>
  );
};

export default App;
