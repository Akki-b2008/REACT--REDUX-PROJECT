import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthWrapper = ({ children }) => {
  const user = useSelector((state) => state.userReducer.user);

  if (user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default UnAuthWrapper;
