import instance from "./api";
import type { ResponseTodo, ResponseTodoById, Todo } from "../types/todos";

const createTodo = async (todo: Todo) => {
  if (!todo.content || !todo.title) throw Error("empty todo");

  const res = await instance({
    url: "/todos",
    method: "POST",
    data: todo,
  });

  if (res.status !== 200) throw Error("예상치 못한 에러가 발생했습니다");

  const data: ResponseTodo = await res.data;

  return data;
};

const getTodoById = async (id: string) => {
  if (!id) throw Error("empty id");

  const res = await instance({
    url: `/todos/${id}`,
    method: "GET",
  });

  if (res.status !== 200) throw Error("예상치 못한 에러가 발생했습니다");

  const data: ResponseTodoById = await res.data;

  return data;
};

const updateTodo = async (todo: Todo, id: string) => {
  if (!id) throw Error("empty id");

  const res = await instance({
    url: `/todos/${id}`,
    method: "PUT",
    data: todo,
  });

  if (res.status !== 200) throw Error("예상치 못한 에러가 발생했습니다");

  const data: ResponseTodo = await res.data;

  return data;
};

const deleateTodo = async (id: string) => {
  if (!id) throw Error("empty id");

  const res = await instance({
    url: `/todos/${id}`,
    method: "DELETE",
  });

  if (res.status !== 200) throw Error("예상치 못한 에러가 발생했습니다");

  const data: ResponseTodo = await res.data;

  return data;
};

export { createTodo, getTodoById, updateTodo, deleateTodo };
