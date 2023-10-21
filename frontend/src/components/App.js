import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage.js';
import ChatPage from './chatPage.js';
import Page404 from './page404.js';
import { socket } from '../socket.js';
import { addMessages } from '../slices/messagesSlice.js';

const isAutorization = () => window.localStorage.hasOwnProperty('token');
const AutorizationContext = React.createContext(isAutorization());

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('newMessage', (data) => dispatch(addMessages(data)));
    return () => socket.disconnect();
  }, [dispatch]);
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
export { AutorizationContext };
