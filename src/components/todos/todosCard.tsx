import React from "react";
import { NavLink } from "react-router-dom";
import { ResponseTodoData } from "../../types/todos";

type Props = {
  todo: ResponseTodoData;
} & {
  children?: React.ReactNode;
};

const TodosCard = React.memo(function TodosCard({ todo }: Props) {
  return (
    <NavLink
      to={todo.id}
      className={({ isActive }) =>
        `${
          isActive ? "bg-black text-white" : "bg-gray-100 text-black"
        } rounded-md px-4 py-3`
      }
    >
      <div className="w-20">
        <h1 className="text-ellipsis overflow-hidden">{todo.title}</h1>
        <p className="text-ellipsis overflow-hidden">{todo.content}</p>
      </div>
    </NavLink>
  );
});

export default TodosCard;
