import { useSelector } from 'react-redux';
import CreateChannel from './createChannel.js';
import Channel from './channel.js';

const ChatAside = () => {
  const { channels, active } = useSelector((state) => state.channels);
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <CreateChannel />
      </div>
      <ul
        id="channel-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map(({ name, id }) => (
          <Channel key={id} name={name} id={id} active={active} />
        ))}
      </ul>
    </div>
  );
};

export default ChatAside;
