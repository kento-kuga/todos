import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { TaskFolderContext } from "../../common/context/tasks-context";
import { TasksFormParams, TasksLocationState } from "../../common/dto/task";
import { TasksTemplate } from "../Templates/tasks-template";

interface Props {}

export const Tasks = (props: Props) => {
  //context
  const taskFolderContext = React.useContext(TaskFolderContext);

  //hooks
  //ロケーション
  const location = useLocation<TasksLocationState>();
  //フォームパーツ
  const methods = useForm<TasksFormParams>();

  //effect
  React.useEffect(() => {
    taskFolderContext.setTaskFolder(location.state.taskFolderInfo);

    // タスクリスト画面へ遷移したときのみ実行する。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.taskFolderInfo]);

  return (
    <FormProvider {...methods}>
      <TasksTemplate taskFolder={location.state.taskFolderInfo} />
    </FormProvider>
  );
};
