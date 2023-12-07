import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as yup from 'yup';
import Layout from './Layout.js';
import { apiRoutes } from '../routes.js';
import { useAuth } from '../contexts.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(false);
  const [isUniqueUser, setUniqueUser] = useState(true);
  const authorization = useAuth();

  yup.setLocale({
    mixed: {
      required: t('signup.errors.notEmpty'),
      oneOf: t('signup.errors.passwordConfirmation'),
    },
  });
  const SignupSchema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(3, t('signup.errors.usernameLength'))
      .max(20, t('signup.errors.usernameLength')),
    password: yup.string().required().min(6, t('signup.errors.passwordLength')),
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password')]),
  });
  const submitHandle = ({ username, password }) => {
    setDisabled(true);
    axios
      .post(apiRoutes.signup(), { username, password })
      .then((res) => {
        authorization.login(res.data);
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        setDisabled(false);
        if (e.response.status === 409) {
          setUniqueUser(false);
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
      <Form
        onSubmit={formik.handleSubmit}
        className="col-12 col-md-8 mt-3 mb-0"
      >
        <h1 className="text-center mb-4">{t('signup.registration')}</h1>
        <InputGroup className="mb-4" hasValidation>
          <FloatingLabel controlId="floatingName" label={t('signup.username')}>
            <Form.Control
              type="text"
              placeholder={t('signup.username')}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.username}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-4" hasValidation>
          <FloatingLabel
            controlId="floatingPassword"
            label={t('signup.password')}
          >
            <Form.Control
              type="password"
              name="password"
              placeholder={t('signup.password')}
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
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
              isInvalid={!!formik.errors.passwordConfirmation}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.passwordConfirmation}
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
          disabled={isDisabled}
        >
          {t('signup.register')}
        </Button>
      </Form>
    </Layout>
  );
};

export default SignupPage;
