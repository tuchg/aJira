import { useDocumentTitle } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanbans";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTaskQueryKey,
  useTaskSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useReorderTask, useTasks } from "../../utils/tasks";
import { Spin } from "antd";
import { PageContainer } from "../../components/lib";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-drop";
import { useCallback } from "react";

export const KanbanPage = () => {
  useDocumentTitle("看板列表");

  const { data: curProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PageContainer>
        <h1>{curProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColContainer>
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

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());
  const { data: allTasks = [] } = useTasks(useTaskSearchParams());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;

        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];

        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];

        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          toId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type: destination.index > source.index ? "after" : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};
