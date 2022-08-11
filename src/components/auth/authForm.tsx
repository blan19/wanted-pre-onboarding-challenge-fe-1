import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useInput from "../../hooks/useInput";
import useUser from "../../hooks/useUser";
import Button from "../button";
import * as userApi from "../../utils/user";

type Props = {
  type: "login" | "create";
} & {
  children?: React.ReactNode;
};

type FormData = {
  email: string;
  password: string;
};

const AuthForm = ({ type }: Props) => {
  const { values, handleValues } = useInput<FormData>({
    initialState: {
      email: "",
      password: "",
    },
  });
  const {
    error: registerError,
    handleSubmit: handleRegister,
    success: registerSuccess,
  } = useForm<FormData>({ callback: userApi.register, values });
  const {
    error: loginError,
    handleSubmit: handleLogin,
    success: loginSuccess,
  } = useForm<FormData>({
    callback: userApi.login,
    values,
  });
  const { isLogin, mutation } = useUser();
  const navigator = useNavigate();

  const RequireEmailAndPassword = (email: string, password: string) => {
    if (
      email.match("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$") &&
      password.length >= 8
    )
      return false;

    return true;
  };

  const memorizedFn = useMemo(
    () => RequireEmailAndPassword(values.email, values.password),
    [values]
  );

  useEffect(() => {
    if (loginSuccess) mutation();
    if (registerSuccess) mutation();
  }, [loginSuccess, registerSuccess, mutation]);

  useEffect(() => {
    if (isLogin) navigator("/");
  }, [isLogin]);

  return (
    <form
      className="space-y-5 flex flex-col"
      onSubmit={type === "create" ? handleRegister : handleLogin}
    >
      <h1 className="font-bold text-4xl text-center">
        {type === "login" ? "로그인" : "회원가입"}
      </h1>
      <div>
        <label className="text-lg mr-4" htmlFor="email">
          이메일
        </label>
        <input
          className="focus:outline-none focus:border-black focus:ring-1 focus:ring-black  border border-black rounded-lg w-full py-3 px-2 text-lg"
          type="email"
          id="email"
          name="email"
          required
          placeholder="이메일을 적어주세요"
          value={values.email}
          onChange={handleValues}
        />
      </div>
      <div>
        <label className="text-lg mr-4" htmlFor="password">
          비밀번호
        </label>
        <input
          className="focus:outline-none focus:border-black focus:ring-1 focus:ring-black  border border-black rounded-lg w-full py-3 px-2 text-lg"
          type="password"
          id="password"
          name="password"
          minLength={8}
          required
          placeholder="비밀번호를 적어주세요"
          value={values.password}
          onChange={handleValues}
        />
      </div>
      {loginError && (
        <span className="font-bold text-red-600">{loginError}</span>
      )}
      {registerError && (
        <span className="font-bold text-red-600">{registerError}</span>
      )}
      <Button type="submit" disabled={memorizedFn}>
        {type === "login" ? "로그인" : "회원가입"}
      </Button>
      <div className="flex justify-end items-center text-sm">
        <span className="pr-3">
          {type === "login" ? "계정이 없으세요?" : "이미 계정이 존재하세요?"}
        </span>
        {type === "login" ? (
          <Link className="font-bold" to="/auth/signUp">
            회원가입
          </Link>
        ) : (
          <Link className="font-bold" to="/auth/login">
            로그인
          </Link>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
