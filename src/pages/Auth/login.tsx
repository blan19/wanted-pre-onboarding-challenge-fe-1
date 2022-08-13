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

  const { error, handleSubmit, success } = useForm<AuthFormValues>({
    callback: userApi.login,
    values,
  });

  const props: AuthFormProps = {
    type: "login",
    error,
    success,
    values,
    handleSubmit,
    handleValues,
  };

  return <AuthForm {...props} />;
};

export default Login;
