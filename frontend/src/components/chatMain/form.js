import { useSelector } from 'react-redux';
import { useState, useEffect, useRef, useContext } from 'react';
import { socket } from '../../socket.js';
import { AutorizationContext } from '../App.js';

const Form = () => {
  const { username } = useContext(AutorizationContext);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  const [value, setValue] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const [isNetworkError, setNetworkError] = useState(false);
  const { active } = useSelector((state) => state.channels);
  const handlerChange = (e) => {
    setValue(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    const data = { body: value, channelId: active, username };
    socket.emit('newMessage', data, (res) => {
      setNetworkError(res.status !== 'ok');
    });
    setValue('');
    setDisabled(false);
  };
  return (
    <div className="mt-auto px-5 py-3">
      {isNetworkError ? (
        <div class="alert alert-danger">Ошибка сети. Сообщение не доставлено</div>
      ) : null}
      <form onSubmit={handlerSubmit} noValidate className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            onChange={handlerChange}
            value={value}
            ref={inputRef}
          />
          <button type="submit" className="btn btn-group-vertical" disabled={isDisabled}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              ></path>
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
