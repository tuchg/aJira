import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param, setParam] = useQueryParam([
    "name",
    "typeId",
    "processId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId: projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};
export const useTaskQueryKey = () => ["tasks", useKanbanSearchParams()];
