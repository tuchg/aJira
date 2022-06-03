import { TaskType } from "../types";
import { useHTTP } from "./http";
import { useQuery } from "react-query";

export const useTaskTypes = () => {
  const client = useHTTP();
  return useQuery<TaskType[], Error>(["taskTypes"], () => client("taskTypes"));
};
