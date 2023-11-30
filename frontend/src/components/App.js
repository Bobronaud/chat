import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import ChatMain from './pages/chat.js';
import PageNotFound from './pages/pageNotFound.js';
import AuthProvider from './authProvider.js';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<ChatMain />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
