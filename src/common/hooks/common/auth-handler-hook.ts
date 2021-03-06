import React from "react";
import { AuthRepository } from "../../../repositories/auth-repository";
import { useAppContextState } from "../../context/app-context";

export const useAuthHandler = () => {
  //repository
  const Auth = React.useMemo(() => new AuthRepository(), []);

  //state
  const state = useAppContextState();

  /** ログイン */
  const handleLogin = React.useCallback(
    async (email: string, password: string) => {
      try {
        await Auth.login({ email, password }, state.appListener);
      } catch (e) {
        throw e;
      }
    },
    [Auth, state.appListener]
  );

  /** アカウント作成 */
  const handleSignup = React.useCallback(
    async (email: string, password: string) => {
      try {
        await Auth.create({ email, password }, state.appListener);
      } catch (e) {
        throw e;
      }
    },
    [Auth, state.appListener]
  );

  /** 体験ユーザーログイン */
  const handleLoginTryUser = React.useCallback(async () => {
    //env
    const env = process.env;
    const email = env.REACT_APP_TRY_USER_EMAIL;
    const password = env.REACT_APP_TRY_USER_PASSWORD;

    if (email && password) {
      try {
        await Auth.login({ email, password }, state.appListener);
      } catch (e) {
        throw e;
      }
    }
  }, [Auth, state.appListener]);

  /** ログアウト */
  const handleLogout = React.useCallback(() => {
    Auth.logout();
  }, [Auth]);

  return { handleLogin, handleSignup, handleLogout, handleLoginTryUser };
};
