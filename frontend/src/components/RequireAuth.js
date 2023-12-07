import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts.js';
import { pageRoutes } from '../routes.js';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to={pageRoutes.login()} />;
};

export default RequireAuth;
