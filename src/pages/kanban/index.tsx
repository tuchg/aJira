import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanbans";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useTasks } from "../../utils/tasks";
import { Spin } from "antd";
import { PageContainer } from "../../components/lib";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanPage = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: curProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;
  return (
    <PageContainer>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban} />
          ))}
          <CreateKanban />
        </ColContainer>
      )}
      <TaskModal />
    </PageContainer>
  );
};
export const ColContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
