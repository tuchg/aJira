import React, { useState } from "react";
import { RegisterPage } from "./regsiter";
import { LoginPage } from "./login";
import { Button, Card, Divider, Typography } from "antd";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{!isRegister ? "请登录" : "请注册"}</Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterPage onError={setError} />
        ) : (
          <LoginPage onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </ShadowCard>
    </Container>
  );
};
export const LoginButton = styled(Button)`
  width: 100%;
`;
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
const Header = styled.header`
  background: url("${logo}") no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0 ，0，0，0 0.1) 0 0 10px;
  text-align: center;
`;
