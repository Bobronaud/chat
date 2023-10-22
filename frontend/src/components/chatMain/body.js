import { useSelector } from 'react-redux';

const Body = () => {
  const { messages } = useSelector((state) => state.messages);
  const { active } = useSelector((state) => state.channels);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelId }) => channelId === active)
        .map(({ body, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>: {body}
          </div>
        ))}
    </div>
  );
};

export default Body;
