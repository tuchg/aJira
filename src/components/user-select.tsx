import { useUsers } from "../utils/user";
import React from "react";
import { IDSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IDSelect>) => {
  const { data: users } = useUsers();
  return <IDSelect options={users || []} {...props} />;
};
