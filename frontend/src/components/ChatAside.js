import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import CreateChannel from './CreateChannel.js';
import CustomChannel from './CustomChannel.js';
import DefaultChannel from './DefaultChannel.js';

const ChatAside = () => {
  const { t } = useTranslation();
  const { channels, active } = useSelector((state) => state.channels);
  return (
    <Col xs="4" sm="2" className="border-end px-0 bg-light h-100">
      <div className="d-flex justify-content-between mt-1 mb-2 ps-4 pe-2 p-3">
        <b>{t('chat.channels.header')}</b>
        <CreateChannel />
      </div>
      <Nav
        fill
        variant="pills"
        id="channel-box"
        className="px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => {
          if (channel.removable) {
            return <CustomChannel key={channel.id} info={channel} active={active} />;
          }
          return <DefaultChannel key={channel.id} info={channel} active={active} />;
        })}
      </Nav>
    </Col>
  );
};

export default ChatAside;
