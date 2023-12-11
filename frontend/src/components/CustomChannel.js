import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setActive } from '../slices/channelsSlice.js';
import { setModal } from '../slices/uiSlice.js';

const CustomChannel = ({ info, active }) => {
  const { t } = useTranslation();
  const { id, name } = info;
  const dispatch = useDispatch();
  const isActive = active === id;
  return (
    <Nav.Item>
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
        <Dropdown.Toggle
          split
          variant={isActive ? 'primary' : ''}
          id="dropdown-split-basic"
        >
          <span className="visually-hidden">
            {t('chat.channels.dropdown.hiddenLabel')}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="flex-grow-0">
          <Dropdown.Item
            onClick={() =>
              dispatch(setModal({ type: 'remove', channel: info }))
            }
            href="#"
          >
            {t('chat.channels.dropdown.remove')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              dispatch(setModal({ type: 'rename', channel: info }))
            }
            href="#"
          >
            {t('chat.channels.dropdown.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default CustomChannel;
