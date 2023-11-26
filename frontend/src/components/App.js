import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import ChatMain from './pages/chat.js';
import PageNotFound from './pages/pageNotFound.js';
import { AutorizationContext } from '../contexts.js';

const autorizationApi = {
  login: (token, username) => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('username', username);
  },
  logout: () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
  },
  getData: () => {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');
    return { token, username };
  },
  isAutorization: () => Boolean(window.localStorage.getItem('token')),
};

const App = () => (
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

export default App;
