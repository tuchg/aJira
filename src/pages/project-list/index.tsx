import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParam } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  PageContainer,
  Row,
} from "../../components/lib";

export const ProjectListPage = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParam();
  //外部如何获取共享数据，引起状态提升
  const debounceParam = useDebounce(param, 200);
  // 重新刷新一遍
  const {
    isLoading,
    error,
    data: list /*, retry*/,
  } = useProjects(debounceParam);
  const { data: users } = useUsers();

  const { open } = useProjectModal();
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
    <PageContainer>
      {/*<Helmet>*/}
      {/*  <title>项目列表</title>*/}
      {/*</Helmet>*/}
      <Row between>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List
        /* refresh={retry}*/
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </PageContainer>
  );
};

ProjectListPage.whyDidYouRender = false;
