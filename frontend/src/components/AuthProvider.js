import { useState, useMemo } from 'react';
import { AutorizationContext } from '../contexts.js';

const AuthProvider = ({ children }) => {
  const initialUser = localStorage.user ? JSON.parse(localStorage.user) : null;
  const [user, setUser] = useState(initialUser);
  const autorizationApi = useMemo(
    () => ({
      user,
      login(data) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      },
      logout() {
        localStorage.clear();
        setUser(null);
      },
    }),
    [user],
  );
  return (
    <AutorizationContext.Provider value={autorizationApi}>
      {children}
    </AutorizationContext.Provider>
  );
};

export default AuthProvider;
