import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CreateChannel from './CreateChannel.js';
import Channel from './Channel.js';
import DefaultChannel from './DefaultChannel.js';

const ChatAside = () => {
  const { t } = useTranslation();
  const { channels, active } = useSelector((state) => state.channels);
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels.header')}</b>
        <CreateChannel />
      </div>
      <ul
        id="channel-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => {
          if (channel.removable) {
            return <Channel key={channel.id} info={channel} active={active} />;
          }
          return <DefaultChannel key={channel.id} info={channel} active={active} />;
        })}
      </ul>
    </div>
  );
};

export default ChatAside;
