import { Project } from "../pages/project-list/list";
import { useHTTP } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { User } from "../pages/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHTTP();

  const { run, ...result } = useAsync<User[]>();
  // 监听param改变，触发时重新请求数据
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
