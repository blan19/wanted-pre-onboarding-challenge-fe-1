import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="h-full flex flex-col items-center justify-evenly">
      <h1 className="font-bold text-6xl whitespace-pre-line text-center leading-relaxed">
        {`Welcome
        `}
        {`To-do`}
      </h1>
      <Button event={() => navigate("/todos")}>Start</Button>
    </main>
  );
};

export default Home;
