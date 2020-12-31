import React from "react";
import { TaskFolderInfo } from "../dto/task-folder";

//タスクフォルダーリストコンテキストの型
interface TaskFoldersContextState {
  taskFolders: TaskFolderInfo[] | undefined;
  setTaskFolders: React.Dispatch<
    React.SetStateAction<TaskFolderInfo[] | undefined>
  >;
}

//タスクフォルダーリストコンテキストの初期ステート
const initialTaskFoldersContextState = {
  taskFolders: undefined,
  setTaskFolders: () => {},
} as TaskFoldersContextState;

//context
//タスクフォルダーリストコンテキスト
export const TaskFoldersContext = React.createContext(
  initialTaskFoldersContextState
);
//provider
export const TaskFoldersContextProvider: React.FC = ({ children }) => {
  //state
  //タスクフォルダーリスト
  const [taskFolders, setTaskFolders] = React.useState<
    TaskFolderInfo[] | undefined
  >(undefined);

  return (
    <TaskFoldersContext.Provider
      value={{ taskFolders: taskFolders, setTaskFolders: setTaskFolders }}
    >
      {children}
    </TaskFoldersContext.Provider>
  );
};
