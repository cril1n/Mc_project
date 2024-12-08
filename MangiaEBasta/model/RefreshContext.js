import React, { createContext, useContext, useState, useCallback } from "react";

// Creazione del contesto
const RefreshContext = createContext();

// Provider del contesto
export const RefreshProvider = ({ children, initialRefresh = false }) => {
  const [refresh, setRefresh] = useState(initialRefresh);

  // Funzione per aggiornare lo stato di refresh
  const triggerRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  return (
    <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

// Hook personalizzato per accedere al contesto
export const useRefresh = () => useContext(RefreshContext);
