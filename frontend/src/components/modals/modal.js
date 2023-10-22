import Add from './add.js';
import Rename from './rename.js';
import Remove from './remove.js';

const Modal = ({ type }) => {
  switch (type) {
    case 'add': {
      return <Add />;
    }
    case 'rename': {
      return <Rename />;
    }
    case 'remove': {
      return <Remove />;
    }
    default:
      throw new Error(`type: '${type}' does not exist`);
  }
};

export default Modal;
