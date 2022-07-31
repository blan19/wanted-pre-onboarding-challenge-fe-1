import React from "react";
import { API_URL } from "../constants/api";
import type { User } from "../types/user";

const login = async (
  user: User,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  console.log(user);

  const res = await fetch(`${API_URL}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "applcation/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    setLoading(false);
    return res;
  });

  if (!res.ok) throw Error("failure login api");

  return res.json();
};

const signup = async () => {};

const logout = () => {};

export { login, signup, logout };
