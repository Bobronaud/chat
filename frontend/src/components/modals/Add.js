import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { modalClose } from '../../slices/uiSlice.js';
import { useApi } from '../../contexts.js';
import { setActive } from '../../slices/channelsSlice.js';

const Add = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const inputRef = useRef(null);
  const api = useApi();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(modalClose());
  };
  const channelSchema = yup.object().shape({
    channel: yup
      .string()
      .required('chat.modals.errors.notEmpty')
      .min(3, 'chat.modals.errors.length')
      .max(20, 'chat.modals.errors.length')
      .notOneOf(channelsNames, 'chat.modals.errors.notUnique'),
  });
  const handlerSubmit = async ({ channel }) => {
    try {
      const res = await api.newChannel({ name: channel });
      dispatch(setActive(res.data.id));
      closeModal();
      toast.success(t('toasts.channelAdd'));
    } catch (err) {
      toast.error(t('toasts.networkError'));
      rollbar.error(err);
    }
  };

  const formik = useFormik({
    initialValues: { channel: '' },
    validationSchema: channelSchema,
    onSubmit: handlerSubmit,
  });
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.headerAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup hasValidation>
            <Form.Label visuallyHidden="true">{t('chat.modals.inputLabel')}</Form.Label>
            <Form.Control
              required
              name="channel"
              isInvalid={formik.errors.channel && formik.touched.channel}
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.channel}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.channel)}
            </Form.Control.Feedback>
          </InputGroup>

          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModal}>
              {t('chat.modals.buttonClose')}
            </Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
              {t('chat.modals.buttonSubmit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
