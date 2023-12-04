import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts.js';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default RequireAuth;
