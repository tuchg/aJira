import { Project, Task } from "../types";
import { useHTTP } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDelConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";
import { SortProps } from "./kanbans";

export const useTask = (id?: number) => {
  const client = useHTTP();
  return useQuery<Project>(
    ["task", { id }],
    () => client(`tasks/${id}`),
    // id不为空时才会触发
    { enabled: Boolean(id) }
  );
};

export const useTasks = (param?: Partial<Task>) => {
  const client = useHTTP();
  return useQuery<Task[], Error>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHTTP();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHTTP();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHTTP();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDelConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHTTP();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
