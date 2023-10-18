import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AutorizationContext } from './App.js';
import ChannelsBox from './channelsBox.js';
import Chat from './chat.js';

const ChatPage = () => {
  const navigate = useNavigate();
  const isAutorization = useContext(AutorizationContext);
  if (!isAutorization) {
    navigate('/login');
  }
  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <Chat />
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  );
};

export default ChatPage;
