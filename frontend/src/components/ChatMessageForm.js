import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useApi, useAuth } from '../contexts.js';

const ChatMessageForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const api = useApi();
  const authorization = useAuth();
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
    const { username } = authorization.user;
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
      {isNetworkError && (
        <Alert variant="danger">{t('chat.networkError')}</Alert>
      )}
      <Form onSubmit={handlerSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            aria-label={t('chat.inputLabel')}
            className="border-0 p-0 ps-2"
            required
            placeholder={t('chat.inputTextPlaceholder')}
            id="body"
            ref={inputRef}
            onChange={handlerChange}
            value={value}
            type="text"
          />
          <Button
            type="submit"
            variant="light"
            className="text-primary"
            disabled={isDisabled}
          >
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
              />
            </svg>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatMessageForm;
