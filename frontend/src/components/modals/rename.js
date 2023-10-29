import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { setModal } from '../../slices/uiSlice.js';
import { socket } from '../../socket.js';

const Rename = ({ channel }) => {
  const inputRef = useRef(null);
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
    }
    setDisabled(false);
  };
  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlerSubmit}>
          <InputGroup hasValidation>
            <Form.Control
              required
              isInvalid={!isValid}
              className="mb-2"
              ref={inputRef}
              onChange={handlerChange}
              value={value}
              type="text"
            />
            <Form.Control.Feedback type="invalid">Должно быть уникальным</Form.Control.Feedback>
          </InputGroup>

          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModal}>
              Отменить
            </Button>
            <Button type="submit" disabled={isDisabled} variant="primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
