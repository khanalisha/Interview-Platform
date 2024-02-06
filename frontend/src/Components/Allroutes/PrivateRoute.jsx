import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  console.log(isAuth, "privateRoute");
  const navigate = useNavigate();

  return <>{children}</>;
};
