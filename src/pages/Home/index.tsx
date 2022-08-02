import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Todos from "../Todos";

const Home = () => {
  const { isLogin } = useUser();

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  return (
    <div>
      <h1>Home Root Route</h1>
      <Routes>
        <Route path="todos/*" element={<Todos />} />
      </Routes>
    </div>
  );
};

export default Home;
