import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

const TodoDetail = lazy(() => import("./TodoDetail"));

const Todos = () => {
  const {} = useQuery("");
  return (
    <div>
      <h1>Todos..</h1>
      <Routes>
        <Route path=":id" element={<TodoDetail />} />
      </Routes>
    </div>
  );
};

export default Todos;
