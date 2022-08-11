import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../../components/loading";
import * as todoApi from "../../utils/todos";
import type { ResponseTodoById } from "../../types/todos";
import useFetch from "../../hooks/useFetch";

const TodoDetail = () => {
  const [error, setError] = useState<string>("");
  const { id, fetchData } = useOutletContext<{
    id: string;
    fetchData: () => Promise<void>;
  }>();
  const { data: todo, error: todoGetError } = useFetch<ResponseTodoById>(
    `/todos/${id}`
  );
  const navigate = useNavigate();

  const handleUpdate = useCallback(
    () => navigate(`/todos/create?type=edit`, { state: todo }),
    [todo]
  );

  const handleDelete = useCallback(() => {
    if (id)
      todoApi
        .deleateTodo(id)
        .then(() => {
          fetchData();
          navigate("/todos");
        })
        .catch((error: Error) => setError(error.message));
  }, [id]);

  useEffect(() => {
    if (todoGetError) navigate("/todos", { replace: true });
  }, [todoGetError]);

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex flex-col h-full items-center justify-start my-10 mx-3 bg-gray-100 rounded-md">
        <div className="relative w-full flex justify-center">
          <label>제목 : </label>
          <span>{todo?.data.title}</span>
          <div className="absolute right-2">
            <span className="cursor-pointer" onClick={handleUpdate}>
              수정
            </span>
            {` / `}
            <span className="cursor-pointer" onClick={handleDelete}>
              삭제
            </span>
          </div>
        </div>
        <p className="mt-5">{todo?.data.content}</p>
        {todoGetError && (
          <span className="font-bold text-red-600">{todoGetError.message}</span>
        )}
      </section>
    </Suspense>
  );
};

export default TodoDetail;
