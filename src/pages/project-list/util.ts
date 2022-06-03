import { useQueryParam, useSetUrlSearchParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/project";
import { useSearchParams } from "react-router-dom";

/**
 * URL？name=&personId=的组件状态解析封装
 */
export const useProjectsSearchParam = () => {
  const [param, setParam] = useQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        // 重复创建对象
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};
export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParam();
  return ["projects", params];
};
/**
 * 利用URL实现的modal全局状态
 */
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const setUrlParams = useSetUrlSearchParam();

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
