import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarHeader from './NavbarHeader.js';
import ChatAside from './ChatAside.js';
import ChatMain from './ChatMain.js';
import Modal from './modals/Modal.js';
import { addMessages } from '../slices/messagesSlice.js';
import { addChannels, setActive } from '../slices/channelsSlice.js';
import { apiRoutes, pageRoutes } from '../routes.js';
import { useAuth } from '../contexts.js';

const Chat = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useAuth();
  const { type, channel } = useSelector((state) => state.ui.modal);
  useEffect(() => {
    axios
      .get(apiRoutes.getData(), {
        headers: authorization.getAuthHeader(),
      })
      .then((response) => {
        const { channels, currentChannelId, messages } = response.data;
        dispatch(addChannels(channels));
        dispatch(setActive(currentChannelId));
        dispatch(addMessages(messages));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          authorization.logout();
          navigate(pageRoutes.login());
        }
        if (err.isAxiosError) {
          toast.error(t('toasts.networkError'));
        } else {
          toast.error(t('toasts.unknownError'));
        }
      });
  }, [dispatch, navigate, authorization, t]);
  return (
    <div className="d-flex flex-column h-100">
      <NavbarHeader />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <ChatAside />
          <ChatMain />
          <Modal type={type} channel={channel} />
        </Row>
      </Container>
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
