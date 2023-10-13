import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage.js';
import ChatPage from './chatPage.js';
import Page404 from './page404.js';

const isAutorization = () => window.localStorage.hasOwnProperty('token');
export const AutorizationContext = React.createContext(isAutorization());

const App = () => {
  return (
    <AutorizationContext.Provider value={isAutorization}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<ChatPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </AutorizationContext.Provider>
  );
};

export default App;
