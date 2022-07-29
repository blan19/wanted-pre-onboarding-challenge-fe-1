import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div>
      <h1>Auth Root Layout</h1>
      <Outlet />
    </div>
  );
};

export default Auth;
