import { Project } from "../pages/project-list/list";
import { useHTTP } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParam } from "../pages/project-list/util";

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
export const useEditProject = () => {
  const client = useHTTP();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParam();
  const queryKey = ["projects", searchParams];

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    // 成功时清理projects请求数据，触发重新刷新
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        return {
          previousItems,
        };
      },
      onError: (error, newItem, context: any) => {
        // 失败时则回滚
        queryClient.setQueryData(queryKey, context.previousItems);
      },
    }
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

export const useProject = (id?: number) => {
  const client = useHTTP();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    // id不为空时才会触发
    { enabled: Boolean(id) }
  );
};
