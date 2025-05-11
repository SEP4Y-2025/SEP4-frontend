import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/UserAuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;