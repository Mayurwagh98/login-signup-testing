import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({component}) => {
  const Navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }
  else{
    <Component {...props} />
  }
  return children;
};

export { PrivateRoute };
