import { useDispatch } from 'react-redux';
import { setModal } from '../../slices/uiSlice.js';
import { setActive } from '../../slices/channelsSlice.js';
import { socket } from '../../socket.js';

const Remove = ({ channel }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal({ type: null }));
  };
  const handlerSubmit = () => {
    socket.emit('removeChannel', { id: channel.id });
    closeModal();
    dispatch(setActive(null));
  };
  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Удалить канал</div>
              <button
                onClick={closeModal}
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">
                  Отменить
                </button>
                <button onClick={handlerSubmit} type="button" className="btn btn-danger">
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Remove;
