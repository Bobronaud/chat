import { useSelector } from 'react-redux';
import Add from './Add.js';
import Rename from './Rename.js';
import Remove from './Remove.js';

const Modal = () => {
  const { modal } = useSelector((state) => state.ui);
  if (!modal) return null;
  switch (modal.type) {
    case 'add': {
      return <Add />;
    }
    case 'rename': {
      return <Rename channel={modal.channel} />;
    }
    case 'remove': {
      return <Remove channel={modal.channel} />;
    }
    default:
      return null;
  }
};

export default Modal;
