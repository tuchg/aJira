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
      <Nav>nav</Nav>
      <Main>
        <ProjectListPage />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 5rem;
`;

//grid-area用于起名
const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;
const RightHeader = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
