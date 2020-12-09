import React from "react";
import { useLocation } from "react-router-dom";
import { TasksLocationState } from "../../common/dto/task";
import { useHeaderLabel } from "../../common/hooks/useHeaderLabel";
import { useTasks } from "../../common/hooks/useTasks";
import { TasksTemplate } from "../Templates/tasks-template";

interface Props {}

export const Tasks = (props: Props) => {
  //hooks
  //ロケーション
  const location = useLocation<TasksLocationState>();
  //ヘッダーラベル
  const [, setHeaderLabel] = useHeaderLabel();

  //state
  //タスクリスト
  const [tasks] = useTasks(location.state.taskFolderInfo.taskFolderId);

  //effect
  React.useEffect(() => {
    //ヘッダーラベルをフォルダー名に
    setHeaderLabel(location.state.taskFolderInfo.folderName);
    //setHeaderLabelは変更されないので依存しない。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.taskFolderInfo.folderName]);

  return (
    <TasksTemplate
      taskFolder={location.state.taskFolderInfo}
      tasks={tasks}
    ></TasksTemplate>
  );
};
