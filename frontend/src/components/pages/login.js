import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';
import NavbarHeader from '../navbarHeader.js';
import routes from '../../routes.js';
import { AutorizationContext } from '../../contexts.js';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isErrorAutorizate, setErrorAutorizate] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const authApi = useContext(AutorizationContext);

  const submitHandle = ({ username, password }) => {
    setDisabled(true);
    axios
      .post(routes.login(), { username, password })
      .then((res) => {
        const { token } = res.data;
        authApi.login(token, username);
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setErrorAutorizate(true);
        } else {
          toast.error(t('toasts.networkError'));
        }
        setDisabled(false);
      });
  };

  const LoginSchema = yup.object().shape({
    username: yup.string().required(t('login.errors.notEmpty')),
    password: yup.string().required(t('login.errors.notEmpty')),
  });

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
                      initialValues={{ username: '', password: '' }}
                      validationSchema={LoginSchema}
                      onSubmit={submitHandle}
                    >
                      {(tools) => (
                        <Form
                          onSubmit={tools.handleSubmit}
                          className="col-12 col-md-8 mt-3 mt-mb-0"
                        >
                          <h1 className="text-center mb-4">
                            {t('login.login')}
                          </h1>
                          <InputGroup className="mb-3" hasValidation>
                            <FloatingLabel
                              controlId="floatingName"
                              label={t('login.username')}
                            >
                              <Form.Control
                                type="text"
                                placeholder={t('login.username')}
                                name="username"
                                value={tools.values.username}
                                onChange={tools.handleChange}
                                isInvalid={
                                  !!tools.errors.username || isErrorAutorizate
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {tools.errors.username}
                              </Form.Control.Feedback>
                            </FloatingLabel>
                          </InputGroup>
                          <InputGroup className="mb-4" hasValidation>
                            <FloatingLabel
                              controlId="floatingPassword"
                              label={t('login.password')}
                            >
                              <Form.Control
                                type="password"
                                placeholder={t('login.password')}
                                name="password"
                                value={tools.values.password}
                                onChange={tools.handleChange}
                                isInvalid={
                                  !!tools.errors.password || isErrorAutorizate
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {tools.errors.password}
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
                            disabled={isDisabled}
                          >
                            {t('login.login')}
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      {t('login.footer.text')}
                      <a href="/signup">{t('login.footer.link')}</a>
                    </div>
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

export default Login;
