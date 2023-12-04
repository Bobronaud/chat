import Add from './Add.js';
import Rename from './Rename.js';
import Remove from './Remove.js';

const Modal = ({ type, channel }) => {
  switch (type) {
    case 'add': {
      return <Add />;
    }
    case 'rename': {
      return <Rename channel={channel} />;
    }
    case 'remove': {
      return <Remove channel={channel} />;
    }
    default:
      return null;
  }
};

export default Modal;
