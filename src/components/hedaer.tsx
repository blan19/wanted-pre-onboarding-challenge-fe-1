import React, { useCallback } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/user";

type Props = {
  isLogin: boolean;
  mutation: () => void;
} & {
  children?: React.ReactNode;
};

const Header = React.memo(function Header({ isLogin, mutation }: Props) {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    mutation();
  }, []);

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

export default Header;
