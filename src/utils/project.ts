import { useHTTP } from "./http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useDelConfig, useEditConfig } from "./use-optimistic-options";
import { Project } from "../types";

/**
 * 查询 project
 * @param param
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHTTP();
  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
};
/**
 * 修改 project
 */
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHTTP();
  // 传入queryKey可避免不同页面使用组件导致的缓存不一致问题,提升通用性
  // const [searchParams] = useProjectsSearchParam();
  // const queryKey = ["projects", searchParams];

  // useMutation一般不参与缓存
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    // 成功时清理projects请求数据，触发重新刷新
    useEditConfig(queryKey)
  );
};

/**
 * 添加 project
 */
export const useAddProject = () => {
  const client = useHTTP();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};
/**
 * 删除 project
 */
export const useDelProject = (queryKey: QueryKey) => {
  const client = useHTTP();

  return useMutation(
    (id: number) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDelConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHTTP();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    // id不为空时才会触发
    { enabled: Boolean(id) }
  );
};
