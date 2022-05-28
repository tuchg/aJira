import { useState } from "react";
import { useMountedRef } from "./index";

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
const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  // useState传入函数的惰性初始化，会在初始化时执行一次，所以要用useState保存函数，不可直接传入函数
  const [retry, setRetry] = useState(() => () => {});
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
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setRetry(() => () => {
      if (runConfig) run(runConfig?.retry(), runConfig);
    });
    setState({ ...state, status: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current) setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        if (config.throwOnError)
          // 直接return error的话 外层无法捕捉到
          return Promise.reject(err);
        else return err;
      });
  };

  // const retry = () => {
  //   run();
  // };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    /**
     * 被调用时，重新run（）,让state刷新
     */
    retry,
    ...state,
  };
};
