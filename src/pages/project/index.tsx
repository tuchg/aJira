import { Link } from "react-router-dom";
import { Route, Routes, Navigate, useLocation } from "react-router";
import { KanbanPage } from "../kanban";
import { EpicPage } from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

/**
 *  方便Menu组件识别路由
 */
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectPage = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu
          mode={"inline"}
          selectedKeys={[routeType]}
          items={[
            {
              key: "kanban",
              label: <Link to={"kanban"}>看板</Link>,
            },
            {
              key: "epic",
              label: <Link to={"epic"}>任务组</Link>,
            },
          ]}
        />
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanPage />} />
          <Route path={"/epic"} element={<EpicPage />} />
          <Route path="*" element={<Navigate to={"kanban"} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  );
};
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.main`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  // 防止向外伸展
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
  width: 100%;
`;
