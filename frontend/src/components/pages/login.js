import { Formik } from 'formik';
import { Button, Form, FloatingLabel, InputGroup, Overlay } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';
import NavbarHeader from '../navbarHeader.js';
import routes from '../../routes.js';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const targetOverlay = useRef(null);
  const [isErrorAutorizate, setErrorAutorizate] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const submitHandle = ({ username, password }) => {
    setDisabled(true);
    axios
      .post(routes.login(), { username, password })
      .then((res) => {
        const { token } = res.data;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('username', username);
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
          <NavbarHeader auth={false} />
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
                      {({ handleSubmit, handleChange, values, errors }) => (
                        <Form onSubmit={handleSubmit} className="col-12 col-md-8 mt-3 mt-mb-0">
                          <h1 className="text-center mb-4">{t('login.login')}</h1>
                          <InputGroup className="mb-3" hasValidation>
                            <FloatingLabel controlId="floatingName" label={t('login.username')}>
                              <Form.Control
                                type="text"
                                placeholder={t('login.username')}
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username || isErrorAutorizate}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.username}
                              </Form.Control.Feedback>
                            </FloatingLabel>
                          </InputGroup>
                          <InputGroup className="mb-4" hasValidation>
                            <FloatingLabel controlId="floatingPassword" label={t('login.password')}>
                              <Form.Control
                                ref={targetOverlay}
                                type="password"
                                placeholder={t('login.password')}
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password || isErrorAutorizate}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
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
                          <Overlay
                            target={targetOverlay.current}
                            show={isErrorAutorizate}
                            placement="bottom"
                          >
                            {({
                              placement: _placement,
                              arrowProps: _arrowProps,
                              show: _show,
                              popper: _popper,
                              hasDoneInitialMeasure: _hasDoneInitialMeasure,
                              ...props
                            }) => (
                              <div
                                {...props}
                                style={{
                                  position: 'absolute',
                                  backgroundColor: 'rgba(250, 100, 100, 0.85)',
                                  marginLeft: '-20px',
                                  padding: '2px 10px',
                                  color: 'white',
                                  borderRadius: 3,
                                  opacity: '0.8',
                                  ...props.style,
                                }}
                              >
                                {t('login.errors.userIsNotExist')}
                              </div>
                            )}
                          </Overlay>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>{t('login.footer.text')}</span>{' '}
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
