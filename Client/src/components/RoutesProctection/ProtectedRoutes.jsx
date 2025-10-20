import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = ({ isAuthenticated, authUser, userType }) => {
  return isAuthenticated && authUser && authUser.role === userType ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
