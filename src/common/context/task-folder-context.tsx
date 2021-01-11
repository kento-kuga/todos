import React from "react";
import { TaskFolderInfo } from "../dto/task-folder";

//タスクフォルダーコンテキストの型
interface TaskFolderContextState {
  taskFolder: TaskFolderInfo | undefined;
  setTaskFolder: React.Dispatch<
    React.SetStateAction<TaskFolderInfo | undefined>
  >;
}

//タスクフォルダーコンテキストの初期ステート
const initialTaskFolderState = {
  taskFolder: undefined,
  setTaskFolder: () => {},
} as TaskFolderContextState;

//タスクフォルダーコンテキスト
export const TaskFolderContext = React.createContext(initialTaskFolderState);

//provider
//タスクフォルダープロバイダ
export const TaskFolderContextProvider: React.FC = React.memo(
  ({ children }) => {
    //state
    //タスクフォルダー
    const [taskFolder, setTaskFolder] = React.useState<
      TaskFolderInfo | undefined
    >(undefined);

    return (
      <TaskFolderContext.Provider
        value={{ taskFolder: taskFolder, setTaskFolder: setTaskFolder }}
      >
        {children}
      </TaskFolderContext.Provider>
    );
  }
);
