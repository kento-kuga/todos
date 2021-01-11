import React from "react";
import { TaskInfo } from "../dto/task";
import { TaskFolderInfo } from "../dto/task-folder";

//タスクリストコンテキストの型
interface TasksContextState {
  tasks: TaskInfo[] | undefined;
  setTasks: React.Dispatch<React.SetStateAction<TaskInfo[] | undefined>>;
}

//タスクリストコンテキストの初期ステート
const initialTasksContextState = {
  tasks: undefined,
  setTasks: () => {},
} as TasksContextState;

//context
//タスクリストコンテキスト
export const TasksContext = React.createContext(initialTasksContextState);

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
  return <TasksContextProvider>{children}</TasksContextProvider>;
});
