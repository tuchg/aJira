import { useDocumentTitle } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanbans";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
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
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop } from "components/drag-drop";

export const KanbanPage = () => {
  useDocumentTitle("看板列表");

  const { data: curProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;

  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());

  return (
    <DragDropContext onDragEnd={() => {}}>
      <PageContainer>
        <h1>{curProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <ColContainer>
              {kanbans?.map((kanban, index) => (
                <Drag
                  key={kanban.id}
                  draggableId={"kanban" + kanban.id}
                  index={index}
                >
                  <KanbanColumn kanban={kanban} key={kanban.id} />
                </Drag>
              ))}
              <CreateKanban />
            </ColContainer>
          </Drop>
        )}
        <TaskModal />
      </PageContainer>
    </DragDropContext>
  );
};
export const ColContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
