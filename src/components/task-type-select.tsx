import React from "react";
import { IDSelect } from "./id-select";
import { useTaskTypes } from "../utils/task-type";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IDSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IDSelect options={taskTypes || []} {...props} />;
};
