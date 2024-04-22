import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
   
    return <Navigate to="/login" />;
  }

  if (!user.isStaff) {

    return <Navigate to="/" />;
  }

  return children; 
};

export default ProtectedRoute;