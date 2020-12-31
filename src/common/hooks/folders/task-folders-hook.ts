import React from "react";
import { getTaskFolders } from "../../../repositories/task-folder-repository";
import { useAppContext } from "../../context/app-context";
import { TaskFoldersContext } from "../../context/task-folders-context";
import { TaskFolderInfo } from "../../dto/task-folder";

/**
 * タスクフォルダーリストフック
 */
export const useTaskFolders = (taskFolderIdList?: string[]) => {
  //state
  //アプリコンテキスト
  const [state, dispatch] = useAppContext();
  //タスクフォルダーコンテキスト
  const taskFoldersContext = React.useContext(TaskFoldersContext);

  //effect
  React.useEffect(() => {
    if (!taskFoldersContext.taskFolders && taskFolderIdList) {
      //タスクフォルダーリストが存在しない場合

      //DBから取得し、セットする。
      const init = async () => {
        const data = await getTaskFolders(taskFolderIdList, state.appListener);
        if (data) {
          taskFoldersContext.setTaskFolders(data);
        }
      };
      init();
    }
    // リスナーは変更されないため含まない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, taskFoldersContext.taskFolders, taskFolderIdList]);

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
