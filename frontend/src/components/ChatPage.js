import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarHeader from './NavbarHeader.js';
import ChatAside from './ChatAside.js';
import ChatMainHeader from './ChatMainHeader.js';
import ChatMainBody from './ChatMainBody.js';
import ChatMessageForm from './ChatMessageForm.js';
import Modal from './modals/Modal.js';
import { addMessages } from '../slices/messagesSlice.js';
import { addChannels, setActive } from '../slices/channelsSlice.js';
import { apiRoutes } from '../routes.js';
import { useAuth } from '../contexts.js';

const Chat = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const authorization = useAuth();

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
        rollbar.error(err);
        if (!err.isAxiosError) {
          toast.error(t('toasts.unknownError'));
        } else if (err.response.status === 401) {
          authorization.logout();
        } else {
          toast.error(t('toasts.networkError'));
        }
      });
  }, [dispatch, authorization, t, rollbar]);
  return (
    <div className="d-flex flex-column h-100">
      <NavbarHeader />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <ChatAside />
          <Col className="p-0 h-100 d-flex flex-column">
            <ChatMainHeader />
            <ChatMainBody />
            <ChatMessageForm />
          </Col>
          <Modal />
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
