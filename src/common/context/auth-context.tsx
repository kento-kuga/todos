import React from "react";
import firebase from "firebase";
import { UserInfo } from "../dto/user";
import { changeTryUser, useAppContext } from "./app-context";
import { UserRepository } from "../../repositories/user-repository";
import { useHistory } from "react-router-dom";

//認証コンテキストの型
interface AuthContextState {
  /** ユーザー情報 */
  userInfo: UserInfo | null;
  /** ユーザー情報セット関数 */
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

//認証コンテキストの初期ステート
const initialAuthContextState = {
  userInfo: null,
  setUserInfo: {},
} as AuthContextState;

//context
//認証コンテキスト
export const AuthContext = React.createContext(initialAuthContextState);

//provider
export const AuthContextProvider: React.FC = ({ children }) => {
  //env
  const env = process.env;

  //repository
  const User = new UserRepository();
  //context
  const [state, dispatch] = useAppContext();
  //history
  const history = useHistory();
  //state
  //ユーザー情報
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    //ログイン状態監視
    firebase.auth().onAuthStateChanged((user) => {
      try {
        if (user) {
          //ユーザーが存在すれば(ログイン状態なら)ユーザー情報をDBから取得し、セットする。
          const init = async () => {
            const data = await User.getByUserId(user.uid, state.appListener);
            if (data) {
              setUserInfo(data);

              //体験ユーザーならば、Appコンテキストにセットする。
              if (data.userId === env.REACT_APP_TRY_USER_UID) {
                changeTryUser(dispatch, true);
              }
            }
            //フォルダーリスト画面へ遷移
            await history.push("folders");
          };
          init();
        } else {
          //それ以外なら、ユーザーをリセット。
          setUserInfo(null);
          changeTryUser(dispatch, false);
        }
      } catch (e) {
        throw e;
      }
    });
    //ログイン状態が変更されたときのみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
