import { API_URL } from "../constants/api";
import type { ResponseUser, User } from "../types/user";

const auth = async (user: User, type: "login" | "create") => {
  if (!user.email || !user.password)
    throw Error("이메일 또는 패스워드가 비어있습니다");

  const res = await fetch(`${API_URL}/users/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw Error("예상치 못한 에러가 발생했습니다");

  const data: ResponseUser = await res.json();

  localStorage.setItem("auth", data.token);

  return data;
};

const logout = () => {
  localStorage.removeItem("auth");
};

export { auth, logout };
