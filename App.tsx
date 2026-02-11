
import React, { useState, useEffect } from 'react';
import { AppState, Vitals } from './types';
import Dashboard from './components/Dashboard';
import EmergencyAlert from './components/EmergencyAlert';
import Sidebar from './components/Sidebar';
import CaregiverMode from './components/CaregiverMode';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppState>(AppState.DASHBOARD);
  const [isAlertMode, setIsAlertMode] = useState(false);
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 72,
    bloodPressureSys: 118,
    bloodPressureDia: 75,
    spo2: 98,
    temperature: 36.5,
    timestamp: Date.now()
  });

  // Simulation of live data and rare alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => {
        const drift = Math.random() > 0.5 ? 1 : -1;
        let hr = prev.heartRate + drift;
        hr = Math.max(60, Math.min(hr, 105));

        // Occasional simulated critical alert (0.1% chance per tick)
        if (Math.random() > 0.999) {
          hr = 175;
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
    setActiveView(AppState.DASHBOARD);
  };

  const renderContent = () => {
    switch (activeView) {
      case AppState.CAREGIVER:
        return <CaregiverMode vitals={vitals} />;
      case AppState.DASHBOARD:
      default:
        return <Dashboard vitals={vitals} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020408] text-slate-200">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 flex flex-col relative">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/20 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">System Online</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Alex Johnson</div>
              <div className="text-[8px] font-mono text-slate-500 mt-1 uppercase">Safe Node 09</div>
            </div>
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-white/10 p-0.5">
              <img src="https://picsum.photos/seed/user1/100/100" className="w-full h-full rounded-[14px] grayscale" alt="User" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {isAlertMode ? (
            <EmergencyAlert vitals={vitals} onDismiss={handleDismissAlert} />
          ) : (
            renderContent()
          )}
        </div>
      </main>

      <footer className="fixed bottom-4 right-8 opacity-20 text-[8px] font-mono uppercase tracking-[0.5em] pointer-events-none">
        HeartGuard AI // v4.2 // Secure
      </footer>
    </div>
  );
};

export default App;
