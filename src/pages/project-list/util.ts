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
/**
 * 利用URL实现的modal全局状态
 */
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useQueryParam([
    "projectCreate",
  ]);
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectCreate: projectCreate === "true",
    open,
    close,
  };
};
