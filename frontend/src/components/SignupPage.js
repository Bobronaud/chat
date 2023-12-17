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

const SignupPage = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const [isUniqueUser, setUniqueUser] = useState(true);
  const authorization = useAuth();

  const SignupSchema = yup.object().shape({
    username: yup
      .string()
      .required('signup.errors.notEmpty')
      .min(3, 'signup.errors.usernameLength')
      .max(20, 'signup.errors.usernameLength'),
    password: yup
      .string()
      .required('signup.errors.notEmpty')
      .min(6, 'signup.errors.passwordLength'),
    passwordConfirmation: yup
      .string()
      .required('signup.errors.notEmpty')
      .oneOf([yup.ref('password')], 'signup.errors.passwordConfirmation'),
  });
  const submitHandle = ({ username, password }) => {
    return axios
      .post(apiRoutes.signup(), { username, password })
      .then((res) => {
        authorization.login(res.data);
        navigate(pageRoutes.chat());
      })
      .catch((err) => {
        rollbar.error(err);
        if (!err.isAxiosError) {
          toast.error(t('toasts.unknownError'));
        } else if (err.response.status === 409) {
          setUniqueUser(false);
        } else {
          toast.error(t('toasts.networkError'));
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: SignupSchema,
    onSubmit: submitHandle,
  });
  return (
    <Layout>
      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-8 mt-3 mb-0">
        <h1 className="text-center mb-4">{t('signup.registration')}</h1>
        <InputGroup className="mb-4" hasValidation>
          <FloatingLabel controlId="floatingName" label={t('signup.username')}>
            <Form.Control
              type="text"
              placeholder={t('signup.username')}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={formik.errors.username && formik.touched.username}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.username)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-4" hasValidation>
          <FloatingLabel controlId="floatingPassword" label={t('signup.password')}>
            <Form.Control
              type="password"
              name="password"
              placeholder={t('signup.password')}
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={formik.errors.password && formik.touched.password}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.password)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-4" hasValidation>
          <FloatingLabel
            controlId="floatingPasswordConfiramtion"
            label={t('signup.passwordConfirmation')}
          >
            <Form.Control
              type="password"
              name="passwordConfirmation"
              placeholder={t('signup.passwordConfirmation')}
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              isInvalid={
                formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
              }
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.passwordConfirmation)}
            </Form.Control.Feedback>
            {!isUniqueUser && (
              <Alert className="mt-2 mb-0" variant="danger">
                {t('signup.errors.userAlreadyExist')}
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
          {t('signup.register')}
        </Button>
      </Form>
    </Layout>
  );
};

export default SignupPage;
