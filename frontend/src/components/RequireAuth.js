import { useAuth } from '../contexts.js';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default RequireAuth;
