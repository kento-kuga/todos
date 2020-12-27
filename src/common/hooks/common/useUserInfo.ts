import React from "react";
import { getUser } from "../../../repositories/userRepository";
import { useAppContext } from "../../context/AppContext";
import { UserInfo } from "../../dto/user";

/**
 * ユーザー情報フック
 */
export const useUserInfo = (userId?: string) => {
  //state
  const [state, dispatch] = useAppContext();

  //effect
  React.useEffect(() => {
    if (state.userInfo === null && userId) {
      //ユーザー情報が存在しない場合

      //DBから取得し、セットする。
      const init = async () => {
        const data = await getUser(userId, state.appListener);
        if (data) {
          dispatch({
            type: "SET_USER_INFO",
            userInfo: data,
          });
        }
      };
      init();
    }
    // リスナーは変更されないため含まない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.userInfo, userId]);

  //セット関数
  const setUserInfo = (userInfo: UserInfo) => {
    dispatch({
      type: "SET_USER_INFO",
      userInfo: userInfo,
    });
  };

  return [
    state.userInfo ? state.userInfo : new UserInfo(),
    setUserInfo,
  ] as const;
};
