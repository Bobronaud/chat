import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { ApiContext, AutorizationContext } from '../../contexts.js';

const Form = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const api = useContext(ApiContext);
  const authApi = useContext(AutorizationContext);
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
  const handlerSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const { username } = authApi.authData;
    const data = { body: value, channelId: active, username };
    try {
      await api.newMessage(data);
      setValue('');
      setDisabled(false);
    } catch (err) {
      setNetworkError(true);
    }
  };
  return (
    <div className="mt-auto px-5 py-3">
      {isNetworkError ? <div className="alert alert-danger">{t('chat.networkError')}</div> : null}
      <form onSubmit={handlerSubmit} noValidate className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder={t('chat.inputTextPlaceholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={handlerChange}
            value={value}
            ref={inputRef}
          />
          <button type="submit" className="btn btn-group-vertical" disabled={isDisabled}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
