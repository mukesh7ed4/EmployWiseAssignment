import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  

  // If not authenticated, redirect to login and remember the current location
  return isAuthenticated ? (
    children
  ) : (<></>
    // <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;