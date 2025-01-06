import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

interface connectedProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<connectedProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ connected, setConnected }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
