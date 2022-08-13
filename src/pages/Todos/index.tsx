import React, { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import TodosCard from "../../components/todos/todosCard";
import { API_URL } from "../../constants/api";
import useFetch from "../../hooks/useFetch";
import { Header } from "../../components/layouts";
import type { ResponseTodo } from "../../types/todos";

const Todos = () => {
  const { data: todosData, fetchData } = useFetch<ResponseTodo>(
    `${API_URL}/todos`
  );
  const { id } = useParams();

  const memorizeData = useMemo(
    () =>
      todosData?.data.map((todo) => <TodosCard key={todo.id} todo={todo} />),
    [todosData?.data]
  );

  return (
    <>
      <Header />
      <main className="h-full">
        <nav className="flex space-x-3 overflow-x-auto mx-3">
          {memorizeData}
        </nav>
        <Outlet context={{ id, fetchData }} />
      </main>
    </>
  );
};

export default Todos;
