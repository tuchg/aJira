import { Epic } from "../types";
import { useHTTP } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDelConfig } from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHTTP();
  return useQuery<Epic[], Error>(["epics", param], () =>
    client("epics", { data: param })
  );
};
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHTTP();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHTTP();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDelConfig(queryKey)
  );
};
