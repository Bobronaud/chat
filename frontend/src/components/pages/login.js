import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { AutorizationContext } from '../App.js';
import NavbarHeader from '../navbarHeader.js';

const Login = () => {
  const navigate = useNavigate();
  const [isErrorAutorizate, setErrorAutorizate] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const auth = useContext(AutorizationContext);
  const submitHandle = ({ username, password }) => {
    setDisabled(true);
    axios
      .post('/api/v1/login', { username, password })
      .then((res) => {
        const { token } = res.data;
        window.localStorage.setItem('token', token);
        auth.username = username;
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        setErrorAutorizate(true);
        setDisabled(false);
      });
  };

  const LoginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

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
                      initialValues={{ username: '', password: '' }}
                      validationSchema={LoginSchema}
                      onSubmit={submitHandle}
                    >
                      {({ errors }) => (
                        <Form className="col-8 col-md-8 mt-3 mt-mb-0">
                          <h1 className="text-center mb-4">Войти</h1>
                          <div className="form-group">
                            <label className="form-label" htmlFor="username"></label>
                            <Field
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder="Ваш ник"
                            />
                            {errors.name}
                          </div>
                          <div className="form-group mb-4">
                            <label className="form-label" htmlFor="password"></label>
                            <Field
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Пароль"
                            />
                            {errors.pawwsord}
                          </div>
                          {isErrorAutorizate ? (
                            <div className="alert alert-danger">
                              Такого пользователя не существует
                            </div>
                          ) : null}
                          <button
                            type="submit"
                            className="w-100 mb-3 btn btn-outline-primary"
                            disabled={isDisabled}
                          >
                            Войти
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
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
