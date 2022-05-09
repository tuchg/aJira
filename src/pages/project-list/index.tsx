import React from "react";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHTTP } from "../../utils/http";
import styled from "@emotion/styled";

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  //外部如何获取共享数据，引起状态提升
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 1000);
  const client = useHTTP();
  // 监听param改变，触发时重新请求数据
  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
