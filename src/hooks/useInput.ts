import { useCallback, useState } from "react";

type UseInputProps<T> = {
  initialState: T;
};

export default function useInput<T>({ initialState }: UseInputProps<T>) {
  const [values, setValues] = useState<T>(initialState);

  const handleValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    [values]
  );

  return { values, handleValues };
}
