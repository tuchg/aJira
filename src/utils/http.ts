import qs from "qs";
import { logout } from "../auth-provider";
import { useAuth } from "../context/auth-context";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (resp) => {
    if (resp.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject({ message: "重新登录" });
    }
    const data = await resp.json();
    if (resp.ok) return data;
    else return Promise.reject(data);
  });
};
export const useHTTP = () => {
  const { user } = useAuth();
  // todo Parameters ts操作符
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
