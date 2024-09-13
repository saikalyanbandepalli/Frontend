import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('jwtToken');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
//localStorage.removeItem('jwtToken'); give this for logout page
export default ProtectedRoute;
