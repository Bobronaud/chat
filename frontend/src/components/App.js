import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import ChatMain from './pages/chat.js';
import PageNotFound from './pages/pageNotFound.js';

const autorization = {
  isAutorization: Boolean(window.localStorage.getItem('token')),
  username: window.localStorage.getItem('username'),
};
const AutorizationContext = React.createContext();
const App = () => (
  <AutorizationContext.Provider value={autorization}>
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
export { AutorizationContext };
