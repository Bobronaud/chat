import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import ChatMain from './pages/chat.js';
import PageNotFound from './pages/pageNotFound.js';
import { AutorizationContext } from '../contexts.js';

const autorizationApi = {
  user: {
    token: window.localStorage.getItem('token'),
    username: window.localStorage.getItem('username'),
  },
  login(token, username) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('username', username);
    this.user.token = token;
    this.user.username = username;
  },
  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    this.user.token = null;
    this.user.username = null;
  },
  isAutorization() {
    return Boolean(this.user.token);
  },
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
