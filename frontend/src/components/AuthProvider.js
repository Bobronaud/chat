import { useState, useMemo } from 'react';
import { AutorizationContext } from '../contexts.js';

const AuthProvider = ({ children }) => {
  const initialUser = {
    token: window.localStorage.getItem('token'),
    username: window.localStorage.getItem('username'),
  };
  const [user, setUser] = useState(initialUser.token ? initialUser : null);
  const autorizationApi = useMemo(
    () => ({
      user,
      login(token, username) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('username', username);
        setUser({ token, username });
      },
      logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
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
