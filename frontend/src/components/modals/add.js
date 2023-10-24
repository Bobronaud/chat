import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { setModal } from '../../slices/uiSlice.js';
import { setActive } from '../../slices/channelsSlice.js';
import { socket } from '../../socket.js';

const Add = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const closeModal = () => {
    dispatch(setModal(null));
  };
  const handlerChange = (e) => {
    setValue(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    setIsValid(!channelsNames.includes(value));
    if (!channelsNames.includes(value)) {
      socket.emit('newChannel', { name: value }, (res) => {
        dispatch(setActive(res.data.id));
      });
      closeModal();
    }
  };
  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Добавить канал</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form className="" onSubmit={handlerSubmit}>
                <div>
                  <input
                    name="name"
                    id="name"
                    ref={inputRef}
                    className={isValid ? 'mb-2 form-control' : 'mb-2 form-control is-invalid'}
                    value={value}
                    onChange={handlerChange}
                  />
                  <label className="visually-hidden" htmlFor="name">
                    Имя канала
                  </label>
                  {isValid ? null : <div className="invalid-feedback">Должно быть уникальным</div>}
                  <div className="d-flex justify-content-end">
                    <button type="button" onClick={closeModal} className="me-2 btn btn-secondary">
                      Отменить
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Отправить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
