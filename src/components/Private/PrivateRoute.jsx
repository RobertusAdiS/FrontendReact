import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  //get user from local storage
  const user = localStorage.getItem("token");

  //if user is not present, redirect to login page
  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
