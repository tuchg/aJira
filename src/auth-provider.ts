import { User } from "pages/project-list/search-panel";
import exp from "constants";

const localStorageKey = "__auth_provider_token__";
const apiURL = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

/**
 * 登录
 * @param param
 */
export const login = (param: { username: string; password: string }) => {
  return fetch(`${apiURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResponse(await resp.json());
    } else {
      return Promise.reject(param);
    }
  });
};
/**
 * 注册
 * @param param
 */
export const register = (param: { username: string; password: string }) => {
  return fetch(`${apiURL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResponse(await resp.json());
    } else {
      return Promise.reject(param);
    }
  });
};

/**
 * 登出
 */
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
