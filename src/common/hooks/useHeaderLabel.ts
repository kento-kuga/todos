import { useAppContext } from "../context/AppContext";

/**
 * ヘッダーラベルフックス
 */
export const useHeaderLabel = () => {
  //hooks
  //コンテキスト
  const [state, dispatch] = useAppContext();

  //function
  //setter
  const setHeaderLabel = (label: string) => {
    dispatch({ type: "SET_HEADER_LABEL", headerLabel: label });
  };

  return [state.headerLabel, setHeaderLabel] as const;
};
