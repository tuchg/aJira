import { ProjectListPage } from "./pages/project-list";
import { useAuth } from "./context/auth-context";
import { Button } from "antd";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <LeftHeader>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </LeftHeader>
        <RightHeader>
          <Button onClick={logout}>登出</Button>
        </RightHeader>
      </Header>
      <Main>
        <ProjectListPage />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

//grid-area用于起名
const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;
const RightHeader = styled.div``;

const Main = styled.main``;
