import React from "react";
import { getTasks } from "../../repositories/taskRepository";
import { useAppContext } from "../context/AppContext";
import { TasksContext } from "../context/tasks-context";
import { TaskInfo } from "../dto/task";
import { useTaskFolder } from "./useTaskFolder";

/**
 * タスクリストフックス
 */
export const useTasks = () => {
  //context
  const tasksContext = React.useContext(TasksContext);

  //state
  const [state] = useAppContext();
  const [taskFolder] = useTaskFolder();
  // effect
  React.useEffect(() => {
    const init = async () => {
      if (!tasksContext.tasks && taskFolder) {
        //タスクフォルダーが存在せず、タスクフォルダ-が存在する場合。
        //タスクリストを取得し、セット。
        const tmpTasks = await getTasks(
          taskFolder.taskFolderId,
          state.appListener
        );
        tasksContext.setTasks(tmpTasks);
      }
    };
    init();
    // リスナーは変更されないため含まない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskFolder]);

  //タスクリストセット関数
  const setTasks = (tasks: TaskInfo[]) => {
    tasksContext.setTasks(tasks);
  };

  return [tasksContext.tasks, setTasks] as const;
};
