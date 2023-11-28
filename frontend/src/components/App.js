import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import ChatMain from './pages/chat.js';
import PageNotFound from './pages/pageNotFound.js';
import { AutorizationContext } from '../contexts.js';

const App = () => {
  const initialAuthData = {
    token: window.localStorage.getItem('token'),
    username: window.localStorage.getItem('username'),
    isAuthorization: Boolean(window.localStorage.getItem('token')),
  };

  const [authData, setAuthData] = useState(initialAuthData);

  const autorizationApi = useMemo(() => ({
    authData,
    login(token, username) {
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('username', username);
      setAuthData({ token, username, isAuthorization: true });
    },
    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      setAuthData({ token: null, username: null, isAuthorization: false });
    },
  }), [authData]);

  return (
    <AutorizationContext.Provider value={autorizationApi}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<ChatMain />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AutorizationContext.Provider>
  );
};

export default App;
