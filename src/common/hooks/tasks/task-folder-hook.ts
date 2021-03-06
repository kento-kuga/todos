import React from "react";
import { TaskFolderContext } from "../../context/task-folder-context";
import { TaskFolderInfo } from "../../dto/task-folder";

/**
 * タスクフォルダーフック
 */
export const useTaskFolder = () => {
  //context
  const taskFolderContext = React.useContext(TaskFolderContext);

  //セット関数
  const setTaskFolder = (taskFolder: TaskFolderInfo) => {
    taskFolderContext.setTaskFolder(taskFolder);
  };

  return [taskFolderContext.taskFolder, setTaskFolder] as const;
};
