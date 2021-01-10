import React from "react";
import { useLocation } from "react-router-dom";
import { TaskFoldersRepository } from "../../../repositories/task-folders-repository";
import { useAppContextState } from "../../context/app-context";
import { TaskFoldersContext } from "../../context/task-folders-context";
import { TaskFolderInfo } from "../../dto/task-folder";

/**
 * タスクフォルダーリストフック
 */
export const useTaskFolders = (taskFolderIdList?: string[]) => {
  //repository
  const TaskFolders = new TaskFoldersRepository();

  //location
  const location = useLocation();

  //state
  //アプリコンテキスト
  const state = useAppContextState();
  //タスクフォルダーコンテキスト
  const taskFoldersContext = React.useContext(TaskFoldersContext);

  //effect
  React.useEffect(() => {
    if (location.pathname === "/folders" && taskFolderIdList) {
      //フォルダー画面を表示した場合
      if (!state.isTryUser) {
        //体験ユーザーではない場合
        //DBからフォルダーリストを取得し、セットする。
        const init = async () => {
          const data = await TaskFolders.getByFolderIdList(
            taskFolderIdList,
            state.appListener
          );
          if (data) {
            taskFoldersContext.setTaskFolders(data);
          }
        };
        init();
      }
    }
    // 画面遷移時のみ実行する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  //セット関数
  const setTaskFolders = (taskFolders: TaskFolderInfo[]) => {
    taskFoldersContext.setTaskFolders(taskFolders);
  };

  return [
    taskFoldersContext.taskFolders
      ? taskFoldersContext.taskFolders
      : ([] as TaskFolderInfo[]),
    setTaskFolders,
  ] as const;
};
