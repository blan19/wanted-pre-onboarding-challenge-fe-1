import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import useUser from "../../hooks/useUser";
import Button from "../button";
import { useLocation, useNavigate } from "react-router-dom";
import { createTodo, updateTodo } from "../../utils/todos";
import useQueryString from "../../hooks/useQueryString";
import type { Todo } from "../../types/todos";

const TodoForm = () => {
  const { isLogin } = useUser();
  const { state }: { state: any } = useLocation();
  const query = useQueryString();
  const navigate = useNavigate();
  const CheckIsEdit = useMemo(() => query.get("type") === "edit", [query]);
  const [value, setValue] = useState<Todo>({
    title: CheckIsEdit ? state.data.title : "",
    content: CheckIsEdit ? state.data.content : "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (CheckIsEdit)
        updateTodo(value, state.data.id)
          .then(() => navigate("/todos", { replace: true }))
          .catch((error) => console.log(error));
      else
        createTodo(value)
          .then(() => navigate("/todos", { replace: true }))
          .catch((error) => console.log(error));
    },
    [value]
  );

  const handleCancle = useCallback(
    () => navigate("/todos", { replace: true }),
    []
  );

  useLayoutEffect(() => {
    if (isLogin) navigate("/auth/login", { replace: true });
    if (CheckIsEdit && !state) navigate("/todos", { replace: true });
  }, []);

  return (
    <form
      className="h-full flex flex-col justify-center items-center mx-20"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-10 font-bold text-4xl">
        {CheckIsEdit ? "Update To-Do?" : "Adding To-Do?"}
      </h1>
      <div className="w-full space-y-5">
        <label className="font-bold text-xl">Title</label>
        <input
          className="focus:outline-none focus:border-black focus:ring-1 focus:ring-black  border border-black rounded-lg w-full py-3 px-2 text-lg"
          type="text"
          required
          value={value.title}
          name="title"
          onChange={handleChange}
        />
        <label className="font-bold text-xl">Content</label>
        <input
          className="focus:outline-none focus:border-black focus:ring-1 focus:ring-black  border border-black rounded-lg w-full py-3 px-2 text-lg"
          type="text"
          required
          name="content"
          value={value.content}
          onChange={handleChange}
        />
      </div>
      <div className="mt-10 space-x-5">
        <Button type="submit">{CheckIsEdit ? "수정" : "추가"}</Button>
        <Button event={handleCancle} primary={false}>
          취소
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
