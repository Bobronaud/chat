import Col from 'react-bootstrap/Col';
import ChatMainHeader from './ChatMainHeader.js';
import ChatMainBody from './ChatMainBody.js';
import ChatMessageForm from './ChatMessageForm.js';

const ChatMain = () => (
  <Col className="p-0 h-100 d-flex flex-column">
    <ChatMainHeader />
    <ChatMainBody />
    <ChatMessageForm />
  </Col>
);

export default ChatMain;
