import { useAsync } from "./use-async";
import { Project } from "../pages/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHTTP } from "./http";

/**
 * 查询 project
 * @param param
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHTTP();

  const { run, ...result } = useAsync<Project[]>();
  // 监听param改变，触发时重新请求数据
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
/**
 * 修改 project
 */
export const useEditProject = () => {
  const { run, ...result } = useAsync();
  const client = useHTTP();
  // 避免hooks规则限制（不得用于jsx)
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...result,
  };
};
/**
 * 添加 project
 */
export const useAddProject = () => {
  const { run, ...result } = useAsync();
  const client = useHTTP();
  // 避免hooks规则限制（不得用于jsx)
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...result,
  };
};
