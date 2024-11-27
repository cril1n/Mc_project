import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children, initialLocation }) => {
  const [location, setLocation] = useState(initialLocation);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};