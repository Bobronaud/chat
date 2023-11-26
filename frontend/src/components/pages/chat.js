import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarHeader from '../navbarHeader.js';
import ChatAside from '../chatAside/chatAside.js';
import ChatMain from '../chatMain/chatMain.js';
import Modal from '../modals/modal.js';
import { addMessages } from '../../slices/messagesSlice.js';
import { addChannels, setActive } from '../../slices/channelsSlice.js';
import routes from '../../routes.js';
import { AutorizationContext } from '../../contexts.js';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authApi = useContext(AutorizationContext);
  const { type, channel } = useSelector((state) => state.ui.modal);
  useEffect(() => {
    const { token } = authApi.getData();
    axios
      .get(routes.getData(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { channels, currentChannelId, messages } = response.data;
        dispatch(addChannels(channels));
        dispatch(setActive(currentChannelId));
        dispatch(addMessages(messages));
      })
      .catch((e) => {
        if (e.response.status === 401) {
          navigate('/login');
        }
      });
  }, [dispatch, navigate, authApi]);
  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <NavbarHeader />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChatAside />
            <ChatMain />
            <Modal type={type} channel={channel} />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Chat;
