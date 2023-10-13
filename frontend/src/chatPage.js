import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AutorizationContext } from './App.js';

const ChatPage = () => {
  const navigate = useNavigate();
  const isAutorization = useContext(AutorizationContext);
  if (!isAutorization) {
    navigate('/login');
  }
  return <h1>Chat</h1>;
};

export default ChatPage;
