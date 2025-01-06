import React, { createContext, useContext, useState, ReactNode } from "react";

interface ServiceContextType {
  selectedService: any;
  setService: (service: any) => void;
}

interface ServiceProviderProps {
  children: ReactNode;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const setService = (service: any) => {
    setSelectedService(service);
  };

  return (
    <ServiceContext.Provider value={{ selectedService, setService }}>
      {children}
    </ServiceContext.Provider>
  );
};
