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
  const handlerTypeText = () => {};
  const handlerSendMessage = () => {};
  return (
    <div className="row">
      <div className="col-sm-3 mb-4 mb-md-0">
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
      <div className="col-sm-6">
        <ul className="list-unstyled">
          {messages.map((m, i) => (
            <li key={i} className="d-flex justify-content-between mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">Name here</p>
                  <p class="text-muted small mb-0">past time here</p>
                </div>
                <div class="card-body">
                  <p class="mb-0">{m}</p>
                </div>
              </div>
            </li>
          ))}
          <li className="bg-white mb-3">
            <div className="form-outline">
              <textarea
                placeholder="Type your message..."
                className="form-control"
                id="textArea"
                rows="4"
                style={{ resize: 'none' }}
              ></textarea>
              <label className="form-label" htmlFor="textArea"></label>
            </div>
          </li>
          <button
            onChange={handlerTypeText}
            onClick={handlerSendMessage}
            type="button"
            class="btn btn-info btn-rounded float-end"
          >
            Send
          </button>
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
