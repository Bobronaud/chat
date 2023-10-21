import { useSelector } from 'react-redux';

const HeaderChat = () => {
  const { channels, active } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const currentChannelName = channels.find((i) => i.id === active)
    ? channels.find((i) => i.id === active).name
    : '';
  const countOfMessages = messages.filter((e) => e.channelId === active).length;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {currentChannelName}</b>
      </p>
      <span className="text-muted">{countOfMessages} сообщений</span>
    </div>
  );
};

export default HeaderChat;
