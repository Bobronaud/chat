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
import { modalClose } from '../../slices/uiSlice.js';
import { useApi } from '../../contexts.js';

const Rename = ({ channel }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const inputRef = useRef(null);
  const api = useApi();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(modalClose());
  };

  const channelSchema = yup.object().shape({
    channelName: yup
      .string()
      .required('chat.modals.errors.notEmpty')
      .min(3, 'chat.modals.errors.length')
      .max(20, 'chat.modals.errors.length')
      .notOneOf(channelsNames, 'chat.modals.errors.notUnique'),
  });

  const handlerSubmit = async ({ channelName }) => {
    try {
      await api.renameChannel({ id: channel.id, name: channelName });
      closeModal();
      toast.success(t('toasts.channelRename'));
    } catch (err) {
      toast.error(t('toasts.networkError'));
      rollbar.error(err);
    }
  };

  const formik = useFormik({
    initialValues: { channelName: channel.name },
    validationSchema: channelSchema,
    onSubmit: handlerSubmit,
  });
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.headerRename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup hasValidation>
            <Form.Label htmlFor="channelName" visuallyHidden="true">
              {t('chat.modals.inputLabel')}
            </Form.Label>
            <Form.Control
              required
              name="channelName"
              id="channelName"
              isInvalid={formik.errors.channelName && formik.touched.channelName}
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.channelName}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.channelName)}
            </Form.Control.Feedback>
          </InputGroup>

          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModal}>
              {t('chat.modals.buttonClose')}
            </Button>
            <Button type="submit" disabled={formik.isSubmitting} variant="primary">
              {t('chat.modals.buttonSubmit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
