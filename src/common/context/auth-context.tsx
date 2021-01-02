import React from "react";
import firebase from "firebase";

//認証コンテキストの方
interface AuthContextState {
  /** ユーザーId */
  userId: string | undefined;
}

//認証コンテキストの初期ステート
const initialAuthContextState = {
  userId: undefined,
} as AuthContextState;

//context
//認証コンテキスト
export const AuthContext = React.createContext(initialAuthContextState);

/**
 * ログイン状態変更時処理
 */
const changeUser = async (
  user: firebase.User | null | undefined,
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    if (user) {
      //ユーザーが存在すれば(ログイン状態なら)ユーザーをセット。
      setUserId(user.uid);
    } else {
      //それ以外なら、ユーザーをリセット。
      setUserId(undefined);
    }
    window.scrollTo(0, 0);
  } catch (e) {
    throw e;
  }
};

//provider
export const AuthContextProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    //ログイン状態監視
    firebase.auth().onAuthStateChanged((user) => {
      changeUser(user, setUserId);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userId: userId }}>
      {children}
    </AuthContext.Provider>
  );
};
