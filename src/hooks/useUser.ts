import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UseUserProps = {
  redirectTo?: string;
};

export default function useUser(options?: UseUserProps) {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (options?.redirectTo && isLogin)
      navigate(options.redirectTo, { replace: true });
  }, [options?.redirectTo, isLogin]);

  return { isLogin, mutation };
}
