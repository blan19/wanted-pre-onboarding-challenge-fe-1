import React from "react";
import AuthView from "../../components/auth/authLayout";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <AuthView>
      <Outlet />
    </AuthView>
  );
};

export default Auth;
