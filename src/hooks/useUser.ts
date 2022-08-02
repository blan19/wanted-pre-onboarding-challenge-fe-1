import { useCallback, useEffect, useState } from "react";

export default function useUser() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const getUserStatusInLocalSotorage = useCallback(() => {
    const status = localStorage.getItem("auth");
    if (status) return JSON.parse(status);
    return false;
  }, []);

  useEffect(() => {
    if (getUserStatusInLocalSotorage()) setIsLogin(true);
    else setIsLogin(false);
  }, []);

  return { isLogin };
}
