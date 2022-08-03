import React, {
  Suspense,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useOutletContext } from "react-router-dom";
import Loading from "../../components/loading";
import { ResponseTodo } from "../../types/todos";
import { getTodoById } from "../../utils/todos";

type OutletContext = {
  id: string;
};

const TodoDetail = () => {
  const [todo, setTodo] = useState<ResponseTodo>();
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const { id } = useOutletContext<OutletContext>();

  const handleData = useCallback(
    () =>
      getTodoById(id)
        .then((res) => setTodo(res))
        .catch((error: Error) => setError(error.message)),
    []
  );

  return (
    <Suspense fallback={<Loading />}>
      <section>
        <h1>{id}</h1>
      </section>
    </Suspense>
  );
};

export default TodoDetail;
