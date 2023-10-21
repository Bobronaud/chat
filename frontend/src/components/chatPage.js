import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import { AutorizationContext } from './App.js';
import ChannelsBox from './channelsBox.js';
import Chat from './chat.js';
import { addMessages } from '../slices/messagesSlice.js';
import { addChannels, setActive } from '../slices/channelsSlice.js';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAutorization = useContext(AutorizationContext);
  if (!isAutorization) {
    navigate('/login');
  }
  useEffect(() => {
    const { token } = window.localStorage;
    axios
      .get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { channels, currentChannelId, messages } = response.data;
        dispatch(addChannels(channels));
        dispatch(setActive(currentChannelId));
        dispatch(addMessages(messages));
      });
  }, [dispatch]);
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
