import { useSelector } from 'react-redux';
import { useRef, useLayoutEffect } from 'react';

const ChatMainBody = () => {
  const { messages } = useSelector((state) => state.messages);
  const { active } = useSelector((state) => state.channels);
  const messagesBox = useRef(null);
  useLayoutEffect(() => {
    messagesBox.current.scrollTo({
      top: messagesBox.current.scrollHeight,
    });
  }, [messages]);

  return (
    <div
      id="messages-box"
      ref={messagesBox}
      className="chat-messages overflow-auto px-5 "
    >
      {messages
        .filter(({ channelId }) => channelId === active)
        .map(({ body, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
    </div>
  );
};

export default ChatMainBody;
