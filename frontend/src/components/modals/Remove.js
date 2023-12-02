import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { setModal } from '../../slices/uiSlice.js';
import { setActive } from '../../slices/channelsSlice.js';
import { useApi } from '../../contexts.js';

const Remove = ({ channel }) => {
  const { t } = useTranslation();
  const [isDisabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const api = useApi();
  const closeModal = () => {
    dispatch(setModal({ type: null }));
  };
  const handlerSubmit = async () => {
    setDisabled(true);
    try {
      await api.removeChannel({ id: channel.id });
      closeModal();
      toast.success(t('toasts.channelRemove'));
      dispatch(setActive(null));
    } catch (err) {
      toast.error(t('toasts.networkError'));
    }
  };
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.headerRemove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('chat.modals.bodyRemove')}
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={closeModal}>
            {t('chat.modals.buttonClose')}
          </Button>
          <Button
            disabled={isDisabled}
            variant="danger"
            onClick={handlerSubmit}
          >
            {t('chat.modals.buttonRemove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
