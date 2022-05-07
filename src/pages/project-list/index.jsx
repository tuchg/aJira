import React from "react";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { List } from "./list";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "../../utils";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  //外部如何获取共享数据，引起状态提升
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 2000);

  // 监听param改变，触发时重新请求数据
  useEffect(() => {
    debugger
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async resp => {
      if (resp.ok) {
        setList(await resp.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiURL}/users`).then(async resp => {
      if (resp.ok) {
        setUsers(await resp.json());
      }
    });
  });
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List list={list} users={users} />
  </div>;
};
