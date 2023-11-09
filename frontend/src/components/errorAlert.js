import Alert from 'react-bootstrap/Alert';

const ErrorAlert = (condition, message) => {
  if (condition) {
    return (
      <Alert className="mt-2 mb-0" variant="danger">
        {message}
      </Alert>
    );
  }
  return null;
};

export default ErrorAlert;
