import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { setActive } from '../../slices/channelsSlice.js';
import { setModal } from '../../slices/uiSlice.js';

const Channel = (props) => {
  const { t } = useTranslation();
  const { id, name } = props.info;
  const { active } = props;
  const dispatch = useDispatch();
  const isActive = active === id;
  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => {
            dispatch(setActive(id));
          }}
          variant={isActive ? 'primary' : ''}
        >
          {`# ${name}`}
        </Button>
        <Dropdown.Toggle split variant={isActive ? 'primary' : ''} id="dropdown-split-basic">
          <span class="visually-hidden">{t('chat.channels.dropdown.hiddenLabel')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className={'flex-grow-0'}>
          <Dropdown.Item
            onClick={() => dispatch(setModal({ type: 'remove', channel: props.info }))}
            href="#"
          >
            {t('chat.channels.dropdown.remove')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(setModal({ type: 'rename', channel: props.info }))}
            href="#"
          >
            {t('chat.channels.dropdown.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
