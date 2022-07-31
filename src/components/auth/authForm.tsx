import React, { useCallback, useState } from "react";
import { login } from "../../utils/user";
import Button from "../button";

type FormData = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const [value, setValue] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { email, password } = value;

      const data = {
        email,
        password,
      };

      const res = await login(data, setLoading).then((res) => res);
    },
    [value]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>로그인/회원가입</h1>
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
      <Button type="submit">로그인/회원가입</Button>
    </form>
  );
};

export default AuthForm;
