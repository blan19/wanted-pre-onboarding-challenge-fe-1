import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const TodoDetail = lazy(() => import("./TodoDetail"));

const Todos = () => {
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
