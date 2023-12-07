import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { setActive } from '../slices/channelsSlice.js';

const DefaultChannel = ({ info, active }) => {
  const { id, name } = info;
  const dispatch = useDispatch();
  const classes = cn('w-100 rounded-0 text-start btn', {
    'btn-primary': active === id,
  });
  return (
    <li className="nav-item w-100">
      <button
        onClick={() => {
          dispatch(setActive(id));
        }}
        type="button"
        className={classes}
      >
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default DefaultChannel;
