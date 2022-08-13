import React from "react";
import AuthForm from "../../components/auth/authForm";
import useForm from "../../hooks/useForm";
import useInput from "../../hooks/useInput";
import { AuthFormProps, AuthFormValues } from "../../types/auth";
import * as userApi from "../../utils/user";

const SignUp = () => {
  const { values, handleValues } = useInput<AuthFormValues>({
    initialState: {
      email: "",
      password: "",
    },
  });

  const { error, handleSubmit, success } = useForm<AuthFormValues>({
    callback: userApi.register,
    values,
  });

  const props: AuthFormProps = {
    type: "create",
    error,
    success,
    values,
    handleSubmit,
    handleValues,
  };

  return <AuthForm {...props} />;
};

export default SignUp;
