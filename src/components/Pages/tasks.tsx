import React from "react";
import { useLocation } from "react-router-dom";
import { TasksLocationState } from "../../common/dto/task";
import { useTasks } from "../../common/hooks/useTasks";
import { TasksTemplate } from "../Templates/tasks-template";

interface Props {}

export const Tasks = (props: Props) => {
  //hooks
  //ロケーション
  const location = useLocation<TasksLocationState>();

  //state
  //タスクリスト
  const [tasks] = useTasks(location.state.taskFolderInfo.taskFolderId);

  return (
    <TasksTemplate
      taskFolder={location.state.taskFolderInfo}
      tasks={tasks}
    ></TasksTemplate>
  );
};
