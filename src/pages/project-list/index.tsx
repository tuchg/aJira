import React from "react";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useQueryParam } from "../../utils/url";

export const ProjectListPage = () => {
  const [, setParam] = useState({
    name: "",
    personId: "",
  });
  const [param] = useQueryParam(["name", "personId"]);

  //外部如何获取共享数据，引起状态提升
  const debounceParam = useDebounce(param, 1000);
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  // // 监听param改变，触发时重新请求数据
  // useEffect(() => {
  //   run(
  //     client("projects", { data: cleanObject(debounceParam) })
  //   );
  //   //   .then(setList)
  //   // setIsLoading(true);
  //   // client("projects", { data: cleanObject(debounceParam) })
  //   //   .then(setList)
  //   //   .catch((error) => {
  //   //     setList([]);
  //   //     setError(error);
  //   //   })
  //   //   .finally(() => setIsLoading(false));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceParam]);

  return (
    <Container>
      {/*<Helmet>*/}
      {/*  <title>项目列表</title>*/}
      {/*</Helmet>*/}
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
