import React from "react";
import { TaskInfo } from "../dto/task";

//コンテキストの型
interface TasksContextState {
  tasks: TaskInfo[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInfo[]>>;
}

//コンテキストの初期ステート
const initialState = {
  tasks: [] as TaskInfo[],
  setTasks: () => {},
} as TasksContextState;

//context
export const TasksContext = React.createContext(initialState);

//provider
export const TasksContextProvider: React.FC = ({ children }) => {
  //state
  //タスクリスト
  const [tasks, setTasks] = React.useState([] as TaskInfo[]);

  return (
    <TasksContext.Provider value={{ tasks: tasks, setTasks: setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
