import { useCallback, useEffect, useState } from "react";

export default function useUser() {
  const getUserStatusInLocalSotorage = () => {
    if (localStorage.getItem("auth")) return true;
    return false;
  };

  const [isLogin, setIsLogin] = useState<boolean>(getUserStatusInLocalSotorage);

  const mutation = useCallback(
    () => setIsLogin(getUserStatusInLocalSotorage),
    []
  );

  useEffect(() => {
    setIsLogin(() => getUserStatusInLocalSotorage());
  }, [isLogin]);

  return { isLogin, mutation };
}
