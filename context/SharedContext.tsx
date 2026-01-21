
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SharedState {
  globalCount: number;
  lastAction: string;
}

interface SharedContextType {
  state: SharedState;
  incrementGlobal: (amount: number, source: string) => void;
  resetGlobal: () => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined);

export const SharedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SharedState>({
    globalCount: 100,
    lastAction: 'System Initialized',
  });

  const incrementGlobal = (amount: number, source: string) => {
    setState(prev => ({
      ...prev,
      globalCount: prev.globalCount + amount,
      lastAction: `Added ${amount} to Global from ${source}`
    }));
  };

  const resetGlobal = () => {
    setState({ 
      globalCount: 0, 
      lastAction: 'Global State Reset',
    });
  };

  return (
    <SharedContext.Provider value={{ state, incrementGlobal, resetGlobal }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedContext);
  if (!context) throw new Error('useSharedState must be used within SharedProvider');
  return context;
};
