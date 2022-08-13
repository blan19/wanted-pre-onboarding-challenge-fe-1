import React, { useCallback, useEffect } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/user";
import useUser from "../hooks/useUser";

type Props = {} & {
  children?: React.ReactNode;
};

const Header = React.memo(function Header({}: Props) {
  const { isLogin, mutation } = useUser();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    mutation();
  }, [mutation]);

  const handleLogin = useCallback(() => navigate("/auth/login"), []);

  const handleTodoAdd = useCallback(() => navigate("/todos/create"), []);

  return (
    <header className="flex justify-between px-3 py-2">
      <h1 className="font-bold text-2xl">To-Do</h1>
      {isLogin ? (
        <div className="space-x-4">
          <Button event={handleTodoAdd}>투두 추가</Button>
          <Button event={handleLogout}>로그아웃</Button>
        </div>
      ) : (
        <Button event={handleLogin}>로그인</Button>
      )}
    </header>
  );
});

export { Header };
