import React from "react";
import { DisplayLoader } from "../../components/Atoms/loader/display-loader";
import { SystemError } from "../../core/error";
import { Listener } from "../../repositories/listener";
import { getUser } from "../../repositories/userRepository";
import { UserInfo } from "../dto/app";
interface Props {}

//ContextのState型
interface State {
  /** ローディングフラグ */
  isLoading: boolean;
  /** ユーザー情報 */
  userInfo: UserInfo | null;
}

//初期State
const initialState: State = {
  isLoading: false,
  userInfo: null,
};

//actions
type AppContextAction =
  | {
      type: "SHOW_LOADER";
    }
  | {
      type: "HIDE_LOADER";
    }
  | {
      type: "SET_USER_INFO";
      userInfo: UserInfo | null;
    };

//reducer
const reducer = (state: State, action: AppContextAction) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return {
        ...state,
        isLoading: true,
      };
    case "HIDE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.userInfo,
      };
  }
};

//listener
const createAppListener = (
  dispatch?: React.Dispatch<AppContextAction>
): Listener => {
  if (!dispatch) {
    return { started: () => {}, finished: () => {} };
  }

  return {
    started: () => {
      dispatch({
        type: "SHOW_LOADER",
      });
    },

    finished: () => {
      dispatch({
        type: "HIDE_LOADER",
      });
    },
  };
};

//context
export const AppStateContext = React.createContext(initialState);
export const AppDispatchContext = React.createContext(
  {} as React.Dispatch<AppContextAction>
);

//provider
export const AppContextProvider: React.FC<Props> = ({ children, ...props }) => {
  //reducer
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      <AppStateContext.Provider
        value={{
          ...state,
        }}
      >
        <AppDispatchContext.Provider value={dispatch}>
          <DisplayLoader isDisplay={state.isLoading} />
          {children}
        </AppDispatchContext.Provider>
      </AppStateContext.Provider>
    </>
  );
};

//Hooks
/**
 * Appコンテキストステートフック
 */
export const useAppContextState = () => {
  const state = React.useContext(AppStateContext);
  if (state === undefined) {
    throw new SystemError();
  }
  return state;
};

/**
 * Appコンテキストディスパッチフック
 */
export const useAppContextDispatch = () => {
  const dispatch = React.useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new SystemError();
  }
  return dispatch;
};

/**
 * Appコンテキストフック
 */
export const useAppContext = () => {
  return [useAppContextState(), useAppContextDispatch()] as const;
};

/**
 * ユーザー情報フック
 * 呼び出し時にユーザー情報が存在しない場合、DBから取得する。
 */
export const useUserInfo = (userId: string) => {
  //state
  const [state, dispatch] = useAppContext();

  //effect
  React.useEffect(() => {
    if (state.userInfo === null) {
      //ユーザー情報が存在しない場合

      //DBから取得し、セットする。
      const init = async () => {
        const data = await getUser(userId, createAppListener(dispatch));
        if (data) {
          dispatch({
            type: "SET_USER_INFO",
            userInfo: data as UserInfo,
          });
        }
      };
      init();
    }
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
