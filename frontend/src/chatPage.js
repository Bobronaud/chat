import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutorizationContext } from './App.js';
import { addChannel, setActive } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const ChatPage = () => {
  const navigate = useNavigate();
  const isAutorization = useContext(AutorizationContext);
  if (!isAutorization) {
    navigate('/login');
  }
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const { channels, active } = useSelector((state) => state.channels);
  useEffect(() => {
    const { token } = window.localStorage;
    axios
      .get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { currentChannelId } = response.data;
        dispatch(setActive({ currentChannelId }));
        response.data.channels.forEach((channel) => {
          dispatch(addChannel({ channel }));
        });
        response.data.messages.forEach((message) => {
          dispatch(addMessage({ message }));
        });
      });
  }, [dispatch]);
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: 300 }}>
      <p className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Каналы</span>
      </p>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {channels.map(({ name, id }) => {
          const classes = active === id ? 'nav-link active' : 'nav-link link-dark';
          return (
            <li key={id} className="nav-item">
              <p className={classes}>{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatPage;
