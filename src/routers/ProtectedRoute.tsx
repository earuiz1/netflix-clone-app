import React, { ReactNode } from "react";
import useAuth from "../custom-hooks/useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    // Render loading indicator or placeholder while checking authentication state
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
