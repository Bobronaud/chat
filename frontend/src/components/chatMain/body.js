import { useSelector } from 'react-redux';
import { useRef, useLayoutEffect } from 'react';
import filter from 'leo-profanity';

const Body = () => {
  const { messages } = useSelector((state) => state.messages);
  const { active } = useSelector((state) => state.channels);
  const messagesBox = useRef(null);
  useLayoutEffect(() => {
    messagesBox.current.scrollTo({
      top: messagesBox.current.scrollHeight,
    });
  }, [messages]);
  const censored = (text) => {
    filter.loadDictionary('en');
    const censoredByEn = filter.clean(text);
    filter.loadDictionary('ru');
    return filter.clean(censoredByEn);
  };

  return (
    <div id="messages-box" ref={messagesBox} className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelId }) => channelId === active)
        .map(({ body, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {': '}
            {censored(body)}
          </div>
        ))}
    </div>
  );
};

export default Body;
