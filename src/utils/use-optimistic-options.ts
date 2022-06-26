import { QueryKey, useQueryClient } from "react-query";
import { reorder } from "./reorder";
import { Task } from "../types";
import { log } from "util";

/**
 * 乐观更新的配置
 * @param queryKey
 * @param callback 用于传入`增删改`的处理逻辑
 */
export const useOptimisticConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 激发网络请求之前激活该函数
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return {
        previousItems,
      };
    },
    onError: (error: any, newItem: any, context: any) => {
      // 失败时则回滚
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};
export const useDelConfig = (query: QueryKey) =>
  useOptimisticConfig(
    query,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
export const useEditConfig = (query: QueryKey) =>
  useOptimisticConfig(
    query,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (query: QueryKey) =>
  useOptimisticConfig(query, (target, old) => (old ? [...old, target] : []));

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useOptimisticConfig(queryKey, (target, old) => {
    console.log(target, old);
    return reorder({ list: old, ...target });
  });

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useOptimisticConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
