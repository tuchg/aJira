import { useHTTP } from "./http";
import { User } from "../types";
import { useQuery } from "react-query";

/*export const useUsers = (param?: Partial<User>) => {
  const client = useHTTP();

  const { run, ...result } = useAsync<User[]>();
  // 监听param改变，触发时重新请求数据
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};*/
export const useUsers = (param?: Partial<User>) => {
  const client = useHTTP();
  return useQuery<User[], Error>(["users", param], () =>
    client("users", { data: param })
  );
};
