import { useCallback, useReducer, useState } from "react";
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

/**
 * 自动管理组件卸载赋值安全
 * @param dispatch
 */
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    { ...defaultState, ...initialState }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  // useState传入函数的惰性初始化，会在初始化时执行一次，所以要用useState保存函数，不可直接传入函数
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        status: "error",
        data: null,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) run(runConfig?.retry(), runConfig);
      });
      /*  // 导致useCallback无限循环
       * setState({ ...state, status: "loading" });
       */
      safeDispatch({ status: "loading" });
      return promise
        .then((data) => {
          // if (mountedRef.current)
          setData(data);
          return data;
        })
        .catch((err) => {
          setError(err);
          if (config.throwOnError)
            // 直接return error的话 外层无法捕捉到
            return Promise.reject(err);
          return err;
        });
    },
    [config.throwOnError, safeDispatch, setError, setData]
  );

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
