import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Chat from './pages/Chat.js';
import PageNotFound from './pages/PageNotFound.js';
import AuthProvider from './AuthProvider.js';
import RequireAuth from './RequireAuth.js';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
