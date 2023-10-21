import HeaderChat from './headerChat.js';
import MessagesBox from './messagesBox.js';
import MessageForm from './messageForm.js';

const Chat = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <HeaderChat />
        <MessagesBox />
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
