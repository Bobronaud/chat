import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChatMainHeader = ({ children }) => {
  const { t } = useTranslation();
  const { channels, active } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const currentChannelName = channels.find((i) => i.id === active)
    ? channels.find((i) => i.id === active).name
    : '';
  const countOfMessages = messages.filter((e) => e.channelId === active).length;
  const channelName = `# ${currentChannelName}`;
  return (
    <div className="d-flex justify-content-start bg-light mb-4 p-0 shadow-sm small">
      {children}
      <div className="px-2 my-2">
        <p className="m-0">
          <b>{channelName}</b>
        </p>
        <span className="text-muted">
          {t('chat.messagesCounter', { count: countOfMessages })}
        </span>
      </div>
    </div>
  );
};

export default ChatMainHeader;
