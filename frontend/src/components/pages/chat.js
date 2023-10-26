import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { AutorizationContext } from '../App.js';
import ChatAside from '../chatAside/chatAside.js';
import ChatMain from '../chatMain/chatMain.js';
import Modal from '../modals/modal.js';
import { addMessages } from '../../slices/messagesSlice.js';
import { addChannels, setActive } from '../../slices/channelsSlice.js';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAutorization = useContext(AutorizationContext);
  const { type, channel } = useSelector((state) => state.ui.modal);
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
            <ChatAside />
            <ChatMain />
            {type ? <Modal type={type} channel={channel} /> : null}
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  );
};

export default Chat;
