import { Task } from "../types";
import { useHTTP } from "./http";
import { useQuery } from "react-query";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHTTP();
  return useQuery<Task[], Error>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
