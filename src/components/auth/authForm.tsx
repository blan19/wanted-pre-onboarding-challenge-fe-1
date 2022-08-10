import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import * as userApi from "../../utils/user";
import Button from "../button";

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
  const [value, setValue] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const { isLogin } = useUser();
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
    () => RequireEmailAndPassword(value.email, value.password),
    [value]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (type === "create")
        userApi
          .register({ email: value.email, password: value.password })
          .then(() => navigator("/"))
          .catch((error: Error) => setError(error.message));
      else
        userApi
          .login({ email: value.email, password: value.password })
          .then(() => navigator("/"))
          .catch((error: Error) => setError(error.message));
    },
    [value]
  );

  useEffect(() => {
    if (isLogin) navigator("/");
  }, [isLogin]);

  return (
    <form
      className="space-y-5 flex flex-col"
      onSubmit={(e) => startTransition(() => handleSubmit(e))}
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
          value={value.email}
          onChange={handleChange}
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
          value={value.password}
          onChange={handleChange}
        />
      </div>
      {error && <span className="font-bold text-red-600">{error}</span>}
      <Button type="submit" disabled={memorizedFn}>
        {type === "login" ? "로그인" : "회원가입"}
      </Button>
      {isPending ? "진행중.." : null}
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
