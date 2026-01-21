
import React, { useState } from 'react';
import { useSharedState } from '../context/SharedContext';

interface RemoteModuleProps {
  name: string;
  port: string;
  themeColor?: 'indigo' | 'emerald' | 'rose' | 'amber';
}

const RemoteModule: React.FC<RemoteModuleProps> = ({ name, port, themeColor = 'indigo' }) => {
  const { state, incrementGlobal } = useSharedState();
  
  // Restore the "old way": State is local to this component instance
  const [localCount, setLocalCount] = useState(0);

  const themeClasses = {
    indigo: {
      bg: 'from-indigo-900/40 to-slate-900',
      border: 'border-indigo-500/30',
      text: 'text-indigo-300',
      accent: 'bg-indigo-500'
    },
    emerald: {
      bg: 'from-emerald-900/40 to-slate-900',
      border: 'border-emerald-500/30',
      text: 'text-emerald-300',
      accent: 'bg-emerald-500'
    },
    rose: {
      bg: 'from-rose-900/40 to-slate-900',
      border: 'border-rose-500/30',
      text: 'text-rose-300',
      accent: 'bg-rose-500'
    },
    amber: {
      bg: 'from-amber-900/40 to-slate-900',
      border: 'border-amber-500/30',
      text: 'text-amber-300',
      accent: 'bg-amber-500'
    }
  }[themeColor];

  return (
    <div className={`p-6 bg-gradient-to-br ${themeClasses.bg} rounded-xl border ${themeClasses.border} shadow-xl w-full transition-all hover:shadow-2xl`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${themeClasses.accent} rounded-full animate-pulse`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${themeClasses.text}`}>
            {name}
          </span>
        </div>
        <span className="text-[10px] font-mono opacity-40">PORT: {port}</span>
      </div>
      
      <div className="space-y-4">
        {/* Local Module State (restored) */}
        <div className="p-3 bg-black/20 rounded-lg border border-white/5">
          <p className="text-[9px] uppercase font-bold text-slate-500 mb-2">Module-Local Counter (Internal)</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">{localCount}</span>
            <button
              onClick={() => setLocalCount(prev => prev + 1)}
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-md border border-white/10 transition-colors"
            >
              Update Local
            </button>
          </div>
        </div>

        {/* Global Host Interaction */}
        <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
          <p className="text-[9px] uppercase font-bold text-amber-500/60 mb-2">Host Bridge</p>
          <div className="flex flex-col gap-3">
             <div className="flex justify-between items-end">
                <span className="text-xs text-slate-400">Global Registry:</span>
                <span className="text-lg font-black text-amber-400 font-mono">{state.globalCount}</span>
             </div>
             <button
              onClick={() => incrementGlobal(10, name)}
              className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest rounded-md border border-amber-500/20 transition-all active:scale-[0.98]"
            >
              Push +10 Global
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteModule;
