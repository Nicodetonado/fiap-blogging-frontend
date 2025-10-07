import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireTeacher = false }) => {
  const { isAuthenticated, isTeacher, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireTeacher && !isTeacher) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
