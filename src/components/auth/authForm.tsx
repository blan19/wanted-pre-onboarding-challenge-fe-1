import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { auth } from "../../utils/user";
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

      const { email, password } = value;

      const data = {
        email,
        password,
      };

      auth(data, type)
        .then(() => navigator("/"))
        .catch((error: Error) => setError(error.message));
    },
    [value]
  );

  useEffect(() => {
    if (isLogin) navigator("/");
  }, [isLogin]);

  return (
    <form onSubmit={(e) => startTransition(() => handleSubmit(e))}>
      <h1>{type === "login" ? "로그인" : "회원가입"}</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input
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
        <label htmlFor="password">비밀번호</label>
        <input
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
      {error && <span>{error}</span>}
      <Button type="submit" disabled={memorizedFn}>
        {type === "login" ? "로그인" : "회원가입"}
      </Button>
      {isPending ? "진행중.." : null}
    </form>
  );
};

export default AuthForm;
