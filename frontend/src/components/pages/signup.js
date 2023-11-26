import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as yup from 'yup';
import NavbarHeader from '../navbarHeader.js';
import routes from '../../routes.js';
import { AutorizationContext } from '../../contexts.js';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(false);
  const [isUniqueUser, setUniqueUser] = useState(true);
  const authApi = useContext(AutorizationContext);

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
      .post(routes.signup(), { username, password })
      .then((res) => {
        const { token } = res.data;
        authApi.login(token, username);
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
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <NavbarHeader />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-6 col-xs-12">
                <div className="card shadow-sm">
                  <div className="card-body row p-5 justify-content-center align-content-center">
                    <Formik
                      initialValues={{
                        username: '',
                        password: '',
                        passwordConfirmation: '',
                      }}
                      validationSchema={SignupSchema}
                      onSubmit={submitHandle}
                    >
                      {(tools) => (
                        <Form
                          onSubmit={tools.handleSubmit}
                          className="col-12 col-md-8 mt-3 mb-0"
                        >
                          <h1 className="text-center mb-4">
                            {t('signup.registration')}
                          </h1>
                          <InputGroup className="mb-4" hasValidation>
                            <FloatingLabel
                              controlId="floatingName"
                              label={t('signup.username')}
                            >
                              <Form.Control
                                type="text"
                                placeholder={t('signup.username')}
                                name="username"
                                value={tools.values.username}
                                onChange={tools.handleChange}
                                isInvalid={!!tools.errors.username}
                              />

                              <Form.Control.Feedback type="invalid">
                                {tools.errors.username}
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
                                value={tools.values.password}
                                onChange={tools.handleChange}
                                isInvalid={!!tools.errors.password}
                              />
                              <Form.Control.Feedback type="invalid">
                                {tools.errors.password}
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
                                value={tools.values.passwordConfirmation}
                                onChange={tools.handleChange}
                                isInvalid={!!tools.errors.passwordConfirmation}
                              />
                              <Form.Control.Feedback type="invalid">
                                {tools.errors.passwordConfirmation}
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
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
