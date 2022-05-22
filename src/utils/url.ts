import { useSearchParams } from "react-router-dom";

/**
 * 返回页面URL中，指定键的参数值
 * @param keys
 */
export const useQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, key: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParams,
    /**
     * as const 用于解决元组、函数解构等类型推断问题
     */
  ] as const;
};
