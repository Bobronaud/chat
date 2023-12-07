import { useState, useMemo } from 'react';
import { AutorizationContext } from '../contexts.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user')),
  );
  const autorization = useMemo(
    () => ({
      user,
      getAuthHeader: () => ({
        Authorization: `Bearer ${user.token}`,
      }),
      login(data) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      },
      logout() {
        localStorage.removeItem('user');
        setUser(null);
      },
    }),
    [user],
  );
  return (
    <AutorizationContext.Provider value={autorization}>
      {children}
    </AutorizationContext.Provider>
  );
};

export default AuthProvider;
