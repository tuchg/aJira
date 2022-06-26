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
import { useDebounce } from "./index";

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
  const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };

  return useQuery<Task[]>(["tasks", debouncedParam], () =>
    client("tasks", { data: debouncedParam })
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
      data: {
        fromId: params.fromId,
        referenceId: params.toId,
        type: params.type,
        fromKanbanId: params.fromKanbanId,
        toKanbanId: params.toKanbanId,
      },
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
