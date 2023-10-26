import Add from './add.js';
import Rename from './rename.js';
import Remove from './remove.js';

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
      throw new Error(`type: '${type}' does not exist`);
  }
};

export default Modal;
