import { useCallback, useEffect, useState } from "react";

export default function useUser() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const getUserStatusInLocalSotorage = useCallback(() => {
    const status = localStorage.getItem("auth");
    if (status) return true;
    return false;
  }, []);

  const mutation = useCallback(() => setIsLogin((prev) => !prev), []);

  useEffect(() => {
    if (getUserStatusInLocalSotorage()) setIsLogin(true);
    else setIsLogin(false);
  }, [isLogin]);

  return { isLogin, mutation };
}
