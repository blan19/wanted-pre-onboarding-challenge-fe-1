import { useCallback, useEffect, useReducer, useRef } from "react";
import instance from "../utils/api";

interface State<T> {
  data?: T;
  error?: Error;
}

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

function useQuery<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> & { fetchData: () => Promise<void> } {
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useCallback(async () => {
    if (!url) return;

    dispatch({ type: "loading" });

    try {
      const res = await instance({
        url,
      });
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }

      const data = (await res.data) as T;
      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: "error", payload: error as Error });
    }
  }, []);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    ...state,
    fetchData,
  };
}

export default useQuery;
