import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { /*useContext,*/ useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
// import { AutorizationContext } from './App.js';

const LoginPage = () => {
  const navigate = useNavigate();
  // const isAutorization = useContext(AutorizationContext);
  const [isErrorAutorizate, setErrorAutorizate] = useState(false);

  const submitHandle = ({ name, password }) => {
    axios
      .post('/api/v1/login', { username: name, password })
      .then((res) => {
        const { token } = res.data;
        window.localStorage.setItem('token', token);
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        setErrorAutorizate(true);
      });
  };

  const LoginSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().min(5, 'Too Short!').required(),
  });

  return (
    <>
      <h1>Login</h1>
      {isErrorAutorizate ? <p>Такого пользователя не существует</p> : null}
      <Formik
        initialValues={{ name: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={submitHandle}
      >
        {({ errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className="form-control" />
              {errors.name}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-control" />
              {errors.password}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
