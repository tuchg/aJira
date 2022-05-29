import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "pages/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { bootstrap, selectUser } from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isError, error, isLoading, isIdle } = useAsync<User | null>();
  // @ts-ignore
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  // 保留刷新页面的用户状态
  useMount(() => {
    run(dispatch(bootstrap()));
  });
  if (isIdle || isLoading) return <FullPageLoading />;
  if (isError) return <FullPageErrorFallback error={error} />;
  return <div>{children}</div>;
};

export const useAuthA = () => {
  // @ts-ignore
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
