import { useQueryParam } from "../../utils/url";
import { useMemo } from "react";

/**
 * URL？name=&personId=的组件状态解析封装
 */
export const useProjectsSearchParam = () => {
  const [param, setParam] = useQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        // 重复创建对象
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};
