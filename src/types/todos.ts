type Todo = {
  title: string;
  content: string;
};

type ResponseTodoData = Todo & {
  id: string;
  createAt: string;
  updateAt: string;
};

type ResponseTodo = {
  data: ResponseTodoData[];
};

export type { Todo, ResponseTodo, ResponseTodoData };
