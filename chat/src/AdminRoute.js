import React from "react";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAdmin ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
