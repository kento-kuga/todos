import React from "react";
import { useLocation } from "react-router-dom";
import { TasksLocationState } from "../../common/dto/task";

interface Props {}

export const Tasks = (props: Props) => {
  //hooks
  //ロケーション
  const location = useLocation<TasksLocationState>();

  return <>タスクリスト：{location.state.taskFolderInfo.folderName}</>;
};
