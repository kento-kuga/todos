import React from "react";
import { getTaskFolders } from "../../repositories/taskRepository";
import { useAppContext } from "../context/AppContext";
import { TaskFolderInfo } from "../dto/app";

/**
 * タスクフォルダーリストフック
 */
export const useTaskFolders = (taskFolderIdList: string[]) => {
  //state
  const [state, dispatch] = useAppContext();

  //effect
  React.useEffect(() => {
    if (state.taskFolders === null) {
      //タスクフォルダーリストが存在しない場合

      //DBから取得し、セットする。
      const init = async () => {
        const data = await getTaskFolders(taskFolderIdList, state.appListener);
        if (data) {
          dispatch({
            type: "SET_TASK_FOLDERS",
            taskFolders: data as TaskFolderInfo[],
          });
        }
      };
      init();
    }
    // リスナーは変更されないため含まない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.taskFolders, taskFolderIdList]);

  //セット関数
  const setTaskFolders = (taskFolders: TaskFolderInfo[]) => {
    dispatch({
      type: "SET_TASK_FOLDERS",
      taskFolders: taskFolders,
    });
  };

  return [
    state.taskFolders ? state.taskFolders : ([] as TaskFolderInfo[]),
    setTaskFolders,
  ] as const;
};