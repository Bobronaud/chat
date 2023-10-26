import { useDispatch } from 'react-redux';
import { setActive } from '../../slices/channelsSlice.js';

const DefaultChannel = (props) => {
  const { id, name } = props.info;
  const { active } = props;
  const dispatch = useDispatch();
  const classes =
    active === id ? 'w-100 rounded-0 text-start btn btn-primary' : 'w-100 rounded-0 text-start btn';
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
