import React from "react";
import { TaskFolderContext } from "../../context/tasks-context";
import { TaskFolderInfo } from "../../dto/taskFolder";

/**
 * タスクフォルダーフック
 */
export const useTaskFolder = () => {
  //context
  const taskFolderContext = React.useContext(TaskFolderContext);

  //セット関数
  const setTaskFolder = (taskFolder: TaskFolderInfo[]) => {
    setTaskFolder(taskFolder);
  };

  return [taskFolderContext.taskFolder, setTaskFolder] as const;
};
