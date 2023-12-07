import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import SignupPage from './SignupPage.js';
import Chat from './ChatPage.js';
import NotFoundPage from './NotFoundPage.js';
import AuthProvider from './AuthProvider.js';
import RequireAuth from './RequireAuth.js';
import { pageRoutes } from '../routes.js';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={pageRoutes.login()} element={<LoginPage />} />
        <Route path={pageRoutes.signup()} element={<SignupPage />} />
        <Route
          path={pageRoutes.chat()}
          element={(
            <RequireAuth>
              <Chat />
            </RequireAuth>
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
