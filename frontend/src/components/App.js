import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import ChatMain from './pages/chat.js';
import PageNotFound from './pages/pageNotFound.js';
import { socket } from '../socket.js';
import { addMessages } from '../slices/messagesSlice.js';
import { addChannels, renameChannel, removeChannel } from '../slices/channelsSlice.js';

const autorization = {
  isAutorization: window.localStorage.hasOwnProperty('token'),
  username: window.localStorage.getItem('username'),
};
const AutorizationContext = React.createContext(autorization);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('newMessage', (data) => dispatch(addMessages(data)));
    socket.on('newChannel', (data) => dispatch(addChannels(data)));
    socket.on('renameChannel', (data) => dispatch(renameChannel(data)));
    socket.on('removeChannel', (data) => dispatch(removeChannel(data)));
    return () => socket.disconnect();
  }, [dispatch]);
  return (
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
};

export default App;
export { AutorizationContext };
