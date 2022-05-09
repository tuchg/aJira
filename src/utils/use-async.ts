import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });
  const setData = (data: D) =>
    setState({
      data,
      status: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, status: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };
  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    ...state,
  };
};