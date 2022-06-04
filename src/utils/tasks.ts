import { Task } from "../types";
import { useHTTP } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig } from "./use-optimistic-options";

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
