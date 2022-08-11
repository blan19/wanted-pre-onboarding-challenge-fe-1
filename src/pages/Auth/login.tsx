import React from "react";
import AuthForm from "../../components/auth/authForm";
import useForm from "../../hooks/useForm";
import useInput from "../../hooks/useInput";
import { AuthFormProps, AuthFormValues } from "../../types/auth";
import * as userApi from "../../utils/user";

const Login = () => {
  const { values, handleValues } = useInput<AuthFormValues>({
    initialState: {
      email: "",
      password: "",
    },
  });
  const {
    error: loginError,
    handleSubmit: handleLogin,
    success: loginSuccess,
  } = useForm<AuthFormValues>({
    callback: userApi.login,
    values,
  });

  const props: AuthFormProps = {
    type: "login",
    error: loginError,
    success: loginSuccess,
    values: values,
    handleSubmit: handleLogin,
    handleValues: handleValues,
  };

  return <AuthForm {...props} />;
};

export default Login;
