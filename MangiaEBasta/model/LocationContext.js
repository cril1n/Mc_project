import React, { createContext, useContext } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children, location }) => (
  <LocationContext.Provider value={location}>
    {children}
  </LocationContext.Provider>
);