import { ProjectListPage } from "./pages/project-list";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProjectPage } from "./pages/project";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/*<Router>作为路由间共享信息的上下文*/}
        <BrowserRouter>
          <Routes>
            <Route path={"/projects"} element={<ProjectListPage />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  );
};
const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <LeftHeader gap={true}>
        <Logo width={"18rem"} height={"5rem"} />
        <h3>项目</h3>
        <h3>用户</h3>
      </LeftHeader>
      <RightHeader>
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
      </RightHeader>
    </Header>
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
