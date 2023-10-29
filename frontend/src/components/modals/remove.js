import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { setModal } from '../../slices/uiSlice.js';
import { setActive } from '../../slices/channelsSlice.js';
import { socket } from '../../socket.js';

const Remove = ({ channel }) => {
  const [isDisabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal({ type: null }));
  };
  const handlerSubmit = () => {
    setDisabled(true);
    socket.emit('removeChannel', { id: channel.id });
    closeModal();
    dispatch(setActive(null));
  };
  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={closeModal}>
            Отменить
          </Button>
          <Button disabled={isDisabled} variant="danger" onClick={handlerSubmit}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
