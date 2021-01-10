import React from "react";
import { TaskInfo } from "../dto/task";
import { TaskFolderInfo } from "../dto/task-folder";

//タスクリストコンテキストの型
interface TasksContextState {
  tasks: TaskInfo[] | undefined;
  setTasks: React.Dispatch<React.SetStateAction<TaskInfo[] | undefined>>;
}

//タスクフォルダーコンテキストの型
interface TaskFolderContextState {
  taskFolder: TaskFolderInfo | undefined;
  setTaskFolder: React.Dispatch<
    React.SetStateAction<TaskFolderInfo | undefined>
  >;
}

//タスクリストコンテキストの初期ステート
const initialTasksContextState = {
  tasks: undefined,
  setTasks: () => {},
} as TasksContextState;

//タスクフォルダーコンテキストの初期ステート
const initialTaskFolderState = {
  taskFolder: undefined,
  setTaskFolder: () => {},
} as TaskFolderContextState;

//context
//タスクリストコンテキスト
export const TasksContext = React.createContext(initialTasksContextState);
//タスクフォルダーコンテキスト
export const TaskFolderContext = React.createContext(initialTaskFolderState);

//provider
//タスクフォルダープロバイダ
const TaskFolderContextProvider: React.FC = React.memo(({ children }) => {
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
});

//タスクリストプロバイダ
const TasksContextProvider: React.FC = React.memo(({ children }) => {
  //state
  //タスクリスト
  const [tasks, setTasks] = React.useState<TaskInfo[] | undefined>(undefined);

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks,
        setTasks: setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
});

//タスクリスト機能プロバイダ
export const TasksProvider: React.FC = React.memo(({ children }) => {
  return (
    <TaskFolderContextProvider>
      <TasksContextProvider>{children}</TasksContextProvider>
    </TaskFolderContextProvider>
  );
});
