import React, { useContext } from 'react';

export const ApiContext = React.createContext();
export const useApi = () => useContext(ApiContext);
export const AutorizationContext = React.createContext();
export const useAuth = () => useContext(AutorizationContext);
