import { Kanban } from "../types";
import { useHTTP } from "./http";
import { useQuery } from "react-query";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHTTP();
  return useQuery<Kanban[], Error>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
