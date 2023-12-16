import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as yup from 'yup';
import Layout from './Layout.js';
import { apiRoutes, pageRoutes } from '../routes.js';
import { useAuth } from '../contexts.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const [isErrorAutorizate, setErrorAutorizate] = useState(false);
  const authorization = useAuth();

  const submitHandle = async ({ username, password }) => {
    axios
      .post(apiRoutes.login(), { username, password })
      .then((res) => {
        authorization.login(res.data);
        navigate(pageRoutes.chat());
      })
      .catch((err) => {
        rollbar.error(err);
        if (!err.isAxiosError) {
          toast.error(t('toasts.unknownError'));
        } else if (err.response.status === 401) {
          setErrorAutorizate(true);
        } else {
          toast.error(t('toasts.networkError'));
        }
      });
  };

  const LoginSchema = yup.object().shape({
    username: yup.string().required('login.errors.notEmpty'),
    password: yup.string().required('login.errors.notEmpty'),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: submitHandle,
  });

  return (
    <Layout withFooter>
      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-8 mt-3 mt-mb-0">
        <h1 className="text-center mb-4">{t('login.login')}</h1>
        <InputGroup className="mb-3" hasValidation>
          <FloatingLabel controlId="floatingName" label={t('login.username')}>
            <Form.Control
              type="text"
              placeholder={t('login.username')}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.username || isErrorAutorizate}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.username)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-4" hasValidation>
          <FloatingLabel controlId="floatingPassword" label={t('login.password')}>
            <Form.Control
              type="password"
              placeholder={t('login.password')}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password || isErrorAutorizate}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.password)}
            </Form.Control.Feedback>
            {isErrorAutorizate && (
              <Alert className="mt-2 mb-0" variant="danger">
                {t('login.errors.userIsNotExist')}
              </Alert>
            )}
          </FloatingLabel>
        </InputGroup>
        <Button
          type="submit"
          variant="outline-primary"
          className="w-100 mb-3"
          disabled={formik.isSubmitting}
        >
          {t('login.login')}
        </Button>
      </Form>
    </Layout>
  );
};

export default LoginPage;
