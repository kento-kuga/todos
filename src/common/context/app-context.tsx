import React from "react";
import { DisplayLoader } from "../../components/atoms/loader/display-loader";
import { SystemError } from "../../core/error";
import { Listener } from "../../core/listener";
interface Props {}

//ContextのState型
interface State {
  /** ローディングフラグ */
  isLoading: boolean;
  /** Appリスナー */
  appListener: Listener;
}

//初期State
const initialState: State = {
  isLoading: false,
  appListener: {} as Listener,
};

//actions
type AppContextAction =
  | {
      type: "SHOW_LOADER";
    }
  | {
      type: "HIDE_LOADER";
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
          appListener: createAppListener(dispatch),
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
