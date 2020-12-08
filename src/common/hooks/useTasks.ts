import React from "react";
import { getTasks } from "../../repositories/taskRepository";
import { useAppContext } from "../context/AppContext";
import { TaskInfo } from "../dto/task";

/**
 * タスクリストフックス
 */
export const useTasks = (taskFolderId: string) => {
  //state
  const [state] = useAppContext();
  //タスクリスト
  const [tasks, setTasks] = React.useState([] as TaskInfo[]);

  // effect
  React.useEffect(() => {
    const init = async () => {
      //タスクリストを取得し、セット。
      const tmpTasks = await getTasks(taskFolderId, state.appListener);
      setTasks(tmpTasks);
    };
    init();
    // リスナーは変更されないため含まない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskFolderId]);

  return [tasks, setTasks] as const;
};
