import React from "react";
import { getTasks } from "../../repositories/taskRepository";
import { useAppContext } from "../context/AppContext";
import { TasksContext } from "../context/task-context";
import { TaskInfo } from "../dto/task";

/**
 * タスクリストフックス
 */
export const useTasks = (taskFolderId?: string) => {
  //state
  const [state] = useAppContext();
  const tasksContext = React.useContext(TasksContext);

  // effect
  React.useEffect(() => {
    const init = async () => {
      console.log("初期取得");
      if (taskFolderId) {
        //タスクフォルダ-IDが存在する場合。
        //タスクリストを取得し、セット。
        const tmpTasks = await getTasks(taskFolderId, state.appListener);
        tasksContext.setTasks(tmpTasks);
      }
    };

    init();
    // リスナーは変更されないため含まない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskFolderId]);

  //タスクリストセット関数
  const setTasks = (tasks: TaskInfo[]) => {
    tasksContext.setTasks(tasks);
  };

  return [tasksContext.tasks, setTasks] as const;
};
