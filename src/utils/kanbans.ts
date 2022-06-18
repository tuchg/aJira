import { Kanban } from "../types";
import { useHTTP } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDelConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";

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
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHTTP();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDelConfig(queryKey)
  );
};
export interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHTTP();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
