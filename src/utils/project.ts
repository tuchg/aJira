import { useAsync } from "./use-async";
import { Project } from "../pages/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHTTP } from "./http";

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
