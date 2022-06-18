import { PageContainer, Row } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useProjectInUrl } from "../kanban/util";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicQueryKey, useEpicSearchParams } from "./util";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "../../utils/tasks";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { useState } from "react";

export const EpicPage = () => {
  useDocumentTitle("任务组");
  const { data: curProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: curProject?.id });
  const { mutate: delEpic } = useDeleteEpic(useEpicQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDelete = (id: number) => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return delEpic({ id: id });
      },
    });
  };
  return (
    <PageContainer>
      <Row between>
        <h1>{curProject?.name}任务组</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>

      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item key={epic.id}>
            <List.Item.Meta
              title={
                <Row between>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDelete(epic?.id)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <p>
                    <Link
                      key={task.id}
                      to={`/projects/${curProject?.id}/kanban?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  </p>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </PageContainer>
  );
};
