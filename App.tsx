
import React, { Suspense, useState } from 'react';
import RemoteModule from './components/RemoteModule';
import { SharedProvider, useSharedState } from './context/SharedContext';

type TabType = 'host' | 'remotes';

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('host');
  const { state, resetGlobal } = useSharedState();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto p-4 md:p-12 space-y-8">
        
        {/* HUD Navigation */}
        <header className="bg-slate-900/60 border border-slate-800/50 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-2xl sticky top-6 z-50 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-600 flex items-center justify-center shadow-xl shadow-orange-500/10">
              <span className="text-white font-black text-2xl tracking-tighter">S</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.25em] mb-1">Global Registry</p>
              <h2 className="text-4xl font-black text-white font-mono leading-none tracking-tight">
                {state.globalCount.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="flex-1 px-8 border-x border-slate-800/50 hidden lg:block">
             <p className="text-[10px] uppercase font-bold text-slate-600 mb-1 tracking-widest">Active Thread</p>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-sm font-medium text-slate-300 italic truncate">"{state.lastAction}"</span>
             </div>
          </div>

          <nav className="flex items-center gap-6">
            <button 
              onClick={resetGlobal} 
              className="text-[10px] font-black text-slate-500 hover:text-rose-400 transition-all uppercase tracking-[0.2em] active:scale-95"
            >
              Flush
            </button>
            <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/50 shadow-inner">
              {(['host', 'remotes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 translate-y-[-1px]' 
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <main className="relative">
          {/* Host View */}
          <div className={`${activeTab === 'host' ? 'block' : 'hidden'} grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out`}>
            <section className="lg:col-span-12 space-y-6">
              <div className="bg-slate-900/30 border border-slate-800/40 rounded-[2.5rem] p-10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                    MFE Orchestrator
                  </h3>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    Runtime: Active
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Suspense fallback={<Loader />}>
                    <RemoteModule name="Alpha Node" port="5001" themeColor="indigo" />
                  </Suspense>
                  <Suspense fallback={<Loader />}>
                    <RemoteModule name="Beta Node" port="5002" themeColor="rose" />
                  </Suspense>
                </div>
              </div>
            </section>
          </div>

          {/* Remotes View */}
          <div className={`${activeTab === 'remotes' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in zoom-in-95 duration-500`}>
            <div className="group space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black font-mono text-indigo-500 uppercase tracking-widest">INGRESS_5001</span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
              </div>
              <div className="transition-transform duration-500 group-hover:scale-[1.01]">
                <RemoteModule name="Alpha Standalone" port="5001" themeColor="emerald" />
              </div>
            </div>
            <div className="group space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black font-mono text-rose-500 uppercase tracking-widest">INGRESS_5002</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
              </div>
              <div className="transition-transform duration-500 group-hover:scale-[1.01]">
                <RemoteModule name="Beta Standalone" port="5002" themeColor="amber" />
              </div>
            </div>
          </div>
        </main>

        <footer className="pt-20 pb-8 flex flex-col items-center gap-4 text-[10px] text-slate-600 font-mono uppercase tracking-[0.4em]">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          <p>Micro-Frontend Core v2.1</p>
        </footer>
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="h-72 flex flex-col items-center justify-center bg-slate-950/40 rounded-3xl border border-slate-800/50 border-dashed group transition-all hover:border-indigo-500/30">
    <div className="relative w-12 h-12 mb-6">
      <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full" />
      <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
    </div>
    <span className="text-[10px] font-black text-indigo-500/40 uppercase tracking-[0.3em] animate-pulse">Initializing Remote Module</span>
  </div>
);

const App: React.FC = () => (
  <SharedProvider>
    <DashboardContent />
  </SharedProvider>
);

export default App;
