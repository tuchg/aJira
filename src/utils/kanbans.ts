import { Kanban } from "../types";
import { useHTTP } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHTTP();
  return useQuery<Kanban[], Error>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHTTP();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
