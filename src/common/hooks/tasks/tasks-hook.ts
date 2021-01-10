import React from "react";
import { useLocation } from "react-router-dom";
import { TasksRepository } from "../../../repositories/tasks-repository";
import { useAppContext } from "../../context/app-context";
import { TasksContext } from "../../context/tasks-context";
import { TaskInfo } from "../../dto/task";
import { TaskFolderInfo } from "../../dto/task-folder";

/**
 * タスクリストフックス
 */
export const useTasks = (taskFolder?: TaskFolderInfo) => {
  //repository
  //タスクリストリポジトリ
  const Tasks = new TasksRepository();

  //context
  //アプリコンテキスト
  const [state] = useAppContext();
  //タスクリストコンテキスト
  const tasksContext = React.useContext(TasksContext);

  //location
  const location = useLocation();

  // effect
  React.useEffect(() => {
    const init = async () => {
      if (location.pathname === "/tasks" && taskFolder) {
        //タスク画面を表示した場合
        if (state.isTryUser) {
          //体験ユーザーの場合
          //空のタスクリストをセット
          tasksContext.setTasks([] as TaskInfo[]);
        } else {
          //体験ユーザーではない場合
          //タスクリストを取得しセット。
          const tmpTasks = await Tasks.getByFolderId(
            taskFolder.taskFolderId,
            state.appListener
          );
          tasksContext.setTasks(tmpTasks);
        }
      }
    };
    init();
    // 画面遷移時のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, taskFolder]);

  //タスクリストセット関数
  const setTasks = (tasks: TaskInfo[]) => {
    //タスクを日付の降順に並べ替え
    tasks.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    });

    tasksContext.setTasks(tasks);
  };

  return [tasksContext.tasks, setTasks] as const;
};
