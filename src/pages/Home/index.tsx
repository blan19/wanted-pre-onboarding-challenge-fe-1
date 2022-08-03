import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Todos from "../Todos";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="h-full flex flex-col items-center justify-evenly">
      <h1 className="font-bold text-6xl whitespace-pre-line text-center leading-relaxed">
        {`Welcome
        `}
        {`To-do`}
      </h1>
      <Button event={() => navigate("/todos")}>Enroll</Button>
      <Routes>
        <Route path="todos/*" element={<Todos />} />
      </Routes>
    </main>
  );
};

export default Home;
