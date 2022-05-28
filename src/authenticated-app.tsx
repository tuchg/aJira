import { ProjectListPage } from "./pages/project-list";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProjectPage } from "./pages/project";
import { resetRoute } from "./utils";
import { useState } from "react";
import { ProjectModal } from "./pages/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type={"link"}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        {/*<Router>作为路由间共享信息的上下文*/}
        <BrowserRouter>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListPage
                  projectButton={
                    <ButtonNoPadding
                      onClick={() => setProjectModalOpen(true)}
                      type={"link"}
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
            {/*默认路由*/}
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
        </BrowserRouter>
      </Main>
      {/*全局共享*/}
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <LeftHeader gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <Logo width={"10rem"} height={"3rem"} />
        </ButtonNoPadding>
        <ProjectPopover projectButton={props.projectButton} />
        <span>用户</span>
      </LeftHeader>
      <RightHeader>
        <User />
      </RightHeader>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        {" "}
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

//grid-area用于起名
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const LeftHeader = styled(Row)``;
const RightHeader = styled.div``;

const Main = styled.main``;
