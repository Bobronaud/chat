import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const LoginPage = () => {
  const submitHandle = () => {};
  const LoginSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().min(6, 'Too Short!').required(),
  });
  return (
    <>
      <h1>Login</h1>
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
