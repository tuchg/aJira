import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { KanbanPage } from "../kanban";
import { EpicPage } from "../epic";

export const ProjectPage = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanPage />} />
        <Route path={"/epic"} element={<EpicPage />} />
        <Route
          path="*"
          element={
            <Navigate
              to={window.location.pathname + "/kanban"}
              replace={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
