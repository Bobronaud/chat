import { useDispatch, useSelector } from 'react-redux';
import { useState, useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';
import { setModal } from '../../slices/uiSlice.js';
import { SocketContext } from '../../contexts.js';

const Rename = ({ channel }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const [value, setValue] = useState(channel.name);
  const [isValid, setIsValid] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const closeModal = () => {
    dispatch(setModal({ type: null }));
  };
  const handlerChange = (e) => {
    setValue(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setIsValid(!channelsNames.includes(value));
    if (!channelsNames.includes(value)) {
      socket.emit('renameChannel', { id: channel.id, name: value });
      closeModal();
      toast.success(t('toasts.channelRename'));
    }
    setDisabled(false);
  };
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.headerRename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlerSubmit}>
          <InputGroup hasValidation>
            <Form.Label htmlFor="channelName" visuallyHidden="true">
              {t('chat.modals.inputLabel')}
            </Form.Label>
            <Form.Control
              required
              id="channelName"
              isInvalid={!isValid}
              className="mb-2"
              ref={inputRef}
              onChange={handlerChange}
              value={value}
              type="text"
            />
            <Form.Control.Feedback type="invalid">{t('chat.modals.invalidValue')}</Form.Control.Feedback>
          </InputGroup>

          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModal}>
              {t('chat.modals.buttonClose')}
            </Button>
            <Button type="submit" disabled={isDisabled} variant="primary">
              {t('chat.modals.buttonSubmit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
