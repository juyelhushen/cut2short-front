import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked, LoadingComponent } = useAuth();
  const location = useLocation();

  console.log("check0", isAuthenticated);
  

  if (!authChecked) {
    return <LoadingComponent />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please login to access this page",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
