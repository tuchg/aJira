import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanbans";
import { useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";

export const KanbanPage = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanbans();
  const { data: curProject } = useProjectInUrl();
  return (
    <div>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel />
      <ColContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColContainer>
    </div>
  );
};
const ColContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
