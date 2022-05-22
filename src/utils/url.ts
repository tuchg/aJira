import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

/**
 * 返回页面URL中，指定键的参数值
 * @param keys
 */
export const useQueryParam = <K extends string>(keys: K[]) => {
  // useState会解决对象实例比较问题
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, key: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    setSearchParams,
    /**
     * as const 用于解决元组、函数解构等类型推断问题
     */
  ] as const;
};
