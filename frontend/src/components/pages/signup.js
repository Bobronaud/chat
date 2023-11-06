import { Formik } from 'formik';
import { Button, Form, FloatingLabel, InputGroup, Overlay } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as yup from 'yup';
import NavbarHeader from '../navbarHeader.js';
import routes from '../../routes.js';

const Signup = () => {
  const { t } = useTranslation();
  const targetOverlay = useRef(null);
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(false);
  const [isUniqueUser, setUniqueUser] = useState(true);
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
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('username', username);
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
          <NavbarHeader auth={false} />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-6 col-md-6 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5 justify-content-center align-content-center">
                    <Formik
                      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
                      validationSchema={SignupSchema}
                      onSubmit={submitHandle}
                    >
                      {({ handleSubmit, handleChange, values, errors }) => (
                        <Form onSubmit={handleSubmit} className="col-8 col-md-8 mt-3 mt-mb-0">
                          <h1 className="text-center mb-4">{t('signup.registration')}</h1>
                          <InputGroup className="mb-4" hasValidation>
                            <FloatingLabel controlId="floatingName" label={t('signup.username')}>
                              <Form.Control
                                type="text"
                                placeholder={t('signup.username')}
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                              />

                              <Form.Control.Feedback type="invalid">
                                {errors.username}
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
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
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
                                value={values.passwordConfirmation}
                                onChange={handleChange}
                                isInvalid={!!errors.passwordConfirmation}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirmation}
                              </Form.Control.Feedback>
                            </FloatingLabel>
                          </InputGroup>
                          <Button
                            type="submit"
                            variant="outline-primary"
                            className="w-100 mb-3"
                            disabled={isDisabled}
                            ref={targetOverlay}
                          >
                            {t('signup.register')}
                          </Button>
                          <Overlay
                            target={targetOverlay.current}
                            show={!isUniqueUser}
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
                                  backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                  margin: '10px auto',
                                  padding: '2px 10px',
                                  color: 'white',
                                  borderRadius: 3,
                                  ...props.style,
                                }}
                              >
                                {t('signup.errors.userAlreadyExist')}
                              </div>
                            )}
                          </Overlay>
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
