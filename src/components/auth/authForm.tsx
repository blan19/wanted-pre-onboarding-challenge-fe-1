import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Button from "../button";
import { isValidatedEmailAndPassword } from "../../utils/validate";
import { H1, Paragraph } from "../typography";
import type { AuthFormProps } from "../../types/auth";

const AuthForm = (props: AuthFormProps) => {
  const { values, type, error, success, handleSubmit, handleValues } = props;
  const { mutation } = useUser({ redirectTo: "/todos" });

  const memorizedFn = useMemo(
    () => isValidatedEmailAndPassword(values.email, values.password),
    [values]
  );

  useEffect(() => {
    if (success) mutation();
  }, [success, mutation]);

  return (
    <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}>
      <H1>{type === "login" ? "로그인" : "회원가입"}</H1>
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
      {error && <span className="font-bold text-red-600">{error}</span>}
      <Button type="submit" disabled={memorizedFn}>
        {type === "login" ? "로그인" : "회원가입"}
      </Button>
      <div className="flex justify-end items-center text-sm">
        <Paragraph as="span" className="pr-2">
          {type === "login" ? "계정이 없으세요?" : "이미 계정이 존재하세요?"}
        </Paragraph>
        {type === "login" ? (
          <Link to="/auth/signUp">
            <Paragraph as="b">회원가입</Paragraph>
          </Link>
        ) : (
          <Link to="/auth/login">
            <Paragraph as="b">로그인</Paragraph>
          </Link>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
