import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated,"mmkksbsjs")
  const location = useLocation();

  // If not authenticated, redirect to login and remember the current location
  return isAuthenticated ? (
    children
  ) : (<></>
    // <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;