import { Formik } from 'formik';
import { Button, Form, InputGroup, Overlay } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { AutorizationContext } from '../App.js';
import NavbarHeader from '../navbarHeader.js';

const Signup = () => {
  const targetOverlay = useRef(null);
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(false);
  const [isUniqueUser, setUniqueUser] = useState(true);
  const auth = useContext(AutorizationContext);
  const SignupSchema = yup.object().shape({
    username: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
    passwordConfirmation: yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });
  const submitHandle = ({ username, password }) => {
    setDisabled(true);
    axios
      .post('/api/v1/signup', { username, password })
      .then((res) => {
        const { token } = res.data;
        window.localStorage.setItem('token', token);
        auth.username = username;
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
                          <h1 className="text-center mb-4">Регистрация</h1>
                          <InputGroup className="mb-4" hasValidation>
                            <Form.Control
                              type="text"
                              placeholder="Имя пользователя"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              isInvalid={!!errors.username}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                            {}
                          </InputGroup>
                          <InputGroup className="mb-4" hasValidation>
                            <Form.Control
                              type="password"
                              placeholder="Пароль"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </InputGroup>
                          <InputGroup className="mb-4" hasValidation>
                            <Form.Control
                              type="password"
                              placeholder="Подтвердите пароль"
                              name="passwordConfirmation"
                              value={values.passwordConfirmation}
                              onChange={handleChange}
                              isInvalid={!!errors.passwordConfirmation}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.passwordConfirmation}
                            </Form.Control.Feedback>
                          </InputGroup>
                          <Button
                            type="submit"
                            variant="outline-primary"
                            className="w-100 mb-3"
                            disabled={isDisabled}
                            ref={targetOverlay}
                          >
                            Зарегистрироваться
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
                                Такой пользователь уже существует
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
