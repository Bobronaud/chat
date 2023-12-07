import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChatMainHeader = () => {
  const { t } = useTranslation();
  const { channels, active } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const currentChannelName = channels.find((i) => i.id === active)
    ? channels.find((i) => i.id === active).name
    : '';
  const countOfMessages = messages.filter((e) => e.channelId === active).length;
  const channelName = `# ${currentChannelName}`;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{channelName}</b>
      </p>
      <span className="text-muted">
        {t('chat.messagesCounter', { count: countOfMessages })}
      </span>
    </div>
  );
};

export default ChatMainHeader;
