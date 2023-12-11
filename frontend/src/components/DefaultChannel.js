import { useDispatch } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { setActive } from '../slices/channelsSlice.js';

const DefaultChannel = ({ info, active }) => {
  const { id, name } = info;
  const dispatch = useDispatch();
  return (
    <Nav.Item>
      <Button
        onClick={() => {
          dispatch(setActive(id));
        }}
        type="button"
        variant={active === id && 'primary'}
        className="w-100 rounded-0 text-start"
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </Nav.Item>
  );
};

export default DefaultChannel;
