import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import ChatMain from './pages/chat.js';
import PageNotFound from './pages/pageNotFound.js';
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
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ChatMain />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AutorizationContext.Provider>
  );
};

export default App;
export { AutorizationContext };
