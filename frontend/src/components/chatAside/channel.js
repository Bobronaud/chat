import { useDispatch } from 'react-redux';
import { useState } from 'react';
import cn from 'classnames';
import { setActive } from '../../slices/channelsSlice.js';
import { setModal } from '../../slices/uiSlice.js';

const Channel = (props) => {
  const { id, name } = props.info;
  const { active } = props;
  const dispatch = useDispatch();
  const isActive = active === id;
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const dropMenu = () => {
    setIsVisibleMenu(!isVisibleMenu);
  };
  return (
    <li className="nav-item w-100">
      <div role="group" className={cn('d-flex btn-group dropdown', { show: isVisibleMenu })}>
        <button
          onClick={() => {
            dispatch(setActive(id));
          }}
          type="button"
          className={cn('w-100 rounded-0 text-start text-truncate btn', {
            'btn-primary': isActive,
          })}
        >
          <span className="me-1">#</span>
          {name}
        </button>
        <button
          type="button"
          onClick={dropMenu}
          aria-expanded={isVisibleMenu}
          ata-toggle="dropdown"
          aria-haspopup="true"
          className={cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', {
            'btn-primary': isActive,
          })}
        >
          <span className="visually-hidden">Управление каналом</span>
        </button>
        <div
          x-placement="bottom-end"
          aria-labelledby="react-aria1309162236-4"
          className={cn('dropdown-menu', { show: isVisibleMenu })}
          data-popper-reference-hidden="false"
          data-popper-escaped="false"
          data-popper-placement="bottom-end"
          style={{
            position: 'absolute',
            inset: '0px 0px auto auto',
            transform: 'translate(0px, 40px)',
          }}
        >
          <button
            data-rr-ui-dropdown-item=""
            className={cn('dropdown-item', { show: isVisibleMenu })}
            tabIndex="0"
            onClick={() => dispatch(setModal({ type: 'remove', channel: props.info }))}
          >
            Удалить
          </button>
          <button
            data-rr-ui-dropdown-item=""
            className={cn('dropdown-item', { show: isVisibleMenu })}
            tabIndex="0"
            onClick={() => dispatch(setModal({ type: 'rename', channel: props.info }))}
          >
            Переименовать
          </button>
        </div>
      </div>
    </li>
  );
};

export default Channel;
