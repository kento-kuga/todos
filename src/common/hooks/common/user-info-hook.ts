import React from "react";
import { AuthContext } from "../../context/auth-context";

/**
 * ユーザー情報フック
 */
export const useUserInfo = () => {
  //context
  const state = React.useContext(AuthContext);

  return [state.userInfo ? state.userInfo : null, state.setUserInfo] as const;
};
