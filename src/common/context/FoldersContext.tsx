import React from "react";

//コンテキストのステート型
interface State {
  /** 削除時ハンドラー */
  handleDeleteFolder: (taskFolderId: string) => void;
  /** フォルダーネーム更新時ハンドラー */
  handleUpdateFolderName: (folderName: string) => void;
}

//初期State
const initialState: State = {
  handleDeleteFolder: () => {},
  handleUpdateFolderName: () => {},
};

//context
export const FoldersContext = React.createContext(initialState);

//provider
interface Props {}

// export const FoldersProvider: React.FC<Props> = ({ children, ...props }) => {
//   return <FoldersContext.Provider value={}></FoldersContext.Provider>
// };
