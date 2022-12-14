import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import useUser from "../../hooks/useUser";
import Button from "../button";
import { useLocation, useNavigate } from "react-router-dom";
import useQueryString from "../../hooks/useQueryString";
import useInput from "../../hooks/useInput";
import useForm from "../../hooks/useForm";
import * as todoApi from "../../utils/todos";
import type { Todo } from "../../types/todos";
import { H1, Paragraph } from "../typography";

const TodoForm = () => {
  const { isLogin } = useUser();
  const { state }: { state: any } = useLocation();
  const query = useQueryString();
  const navigate = useNavigate();
  const isEdit = useMemo(() => query.get("type") === "edit", [query]);
  const { values, handleValues } = useInput<Todo>({
    initialState: {
      title: isEdit ? state.data.title : "",
      content: isEdit ? state.data.content : "",
    },
  });
  const {
    error: createTodoError,
    success: createTodoSuccess,
    handleSubmit: handleCreateTodo,
  } = useForm<Todo>({ values, callback: todoApi.createTodo });
  const {
    error: updateTodoError,
    success: updateTodoSuccess,
    handleSubmit: handleUpdateTodo,
  } = useForm<Todo & { id: string }>({
    values: {
      ...values,
      id: isEdit ? state.data.id : "",
    },
    callback: todoApi.updateTodo,
  });

  const handleCancle = useCallback(
    () => navigate("/todos", { replace: true }),
    []
  );

  useLayoutEffect(() => {
    if (!isLogin) navigate("/auth/login");
    if (isEdit && !state) navigate("/todos", { replace: true });
  }, []);

  useEffect(() => {
    if (createTodoSuccess) navigate("/todos", { replace: true });
    if (updateTodoSuccess) navigate("/todos", { replace: true });
  }, [updateTodoSuccess, createTodoSuccess]);

  return (
    <form
      className="h-full flex flex-col justify-center items-center mx-20"
      onSubmit={isEdit ? handleUpdateTodo : handleCreateTodo}
    >
      <H1>{isEdit ? "Update To-Do?" : "Adding To-Do?"}</H1>
      <div className="w-full space-y-5">
        <label className="font-bold text-xl">Title</label>
        <input
          className="focus:outline-none focus:border-black focus:ring-1 focus:ring-black  border border-black rounded-lg w-full py-3 px-2 text-lg"
          type="text"
          required
          value={values.title}
          name="title"
          onChange={handleValues}
        />
        <label className="font-bold text-xl">Content</label>
        <input
          className="focus:outline-none focus:border-black focus:ring-1 focus:ring-black  border border-black rounded-lg w-full py-3 px-2 text-lg"
          type="text"
          required
          name="content"
          value={values.content}
          onChange={handleValues}
        />
      </div>
      {createTodoError && <Paragraph as="span">{createTodoError}</Paragraph>}
      {updateTodoError && <Paragraph as="span">{updateTodoError}</Paragraph>}
      <div className="mt-10 space-x-5">
        <Button type="submit">{isEdit ? "??????" : "??????"}</Button>
        <Button event={handleCancle} primary={false}>
          ??????
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
