import { useCallback, useEffect, useState } from "react";

type UseFormProps<T> = {
  callback: (args: T) => Promise<any>;
  values: T;
};

export default function useForm<T>({ values, callback }: UseFormProps<T>) {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      callback(values)
        .then(() => setSuccess(true))
        .catch((e: Error) => setError(e.message));
    },
    [values]
  );

  useEffect(() => {
    return () => {
      setSuccess(false);
      setError("");
    };
  }, []);

  return { success, error, handleSubmit };
}
