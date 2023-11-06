import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';
import NavbarHeader from '../navbarHeader.js';
import routes from '../../routes.js';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
                          <h1 className="text-center mb-4">{t('login.login')}</h1>
                          <div className="form-group">
                            <label className="form-label" htmlFor="username"></label>
                            <Field
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder={t('login.username')}
                            />
                            {errors.name}
                          </div>
                          <div className="form-group mb-4">
                            <label className="form-label" htmlFor="password"></label>
                            <Field
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder={t('login.password')}
                            />
                            {errors.pawwsord}
                          </div>
                          {isErrorAutorizate ? (
                            <div className="alert alert-danger">
                              {t('login.errors.userIsNotExist')}
                            </div>
                          ) : null}
                          <button
                            type="submit"
                            className="w-100 mb-3 btn btn-outline-primary"
                            disabled={isDisabled}
                          >
                            {t('login.login')}
                          </button>
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
