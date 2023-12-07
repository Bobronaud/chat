import ChatMainHeader from './ChatMainHeader.js';
import ChatMainBody from './ChatMainBody.js';
import ChatMessageForm from './ChatMessageForm.js';

const ChatMain = () => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <ChatMainHeader />
      <ChatMainBody />
      <ChatMessageForm />
    </div>
  </div>
);

export default ChatMain;
