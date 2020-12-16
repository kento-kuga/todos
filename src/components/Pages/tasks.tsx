import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  TaskInfo,
  TasksFormParams,
  TasksLocationState,
} from "../../common/dto/task";
import { useUpdateTasks } from "../../common/hooks/useUpdateTasks";
import { useTasks } from "../../common/hooks/useTasks";
import { TasksTemplate } from "../Templates/tasks-template";

interface Props {}

export const Tasks = (props: Props) => {
  //hooks
  //ロケーション
  const location = useLocation<TasksLocationState>();
  //フォームパーツ
  const methods = useForm<TasksFormParams>();
  //タスク追加Hook
  const updateTasks = useUpdateTasks();

  //state
  //タスクリスト
  const [tasks, setTasks] = useTasks(
    location.state.taskFolderInfo.taskFolderId
  );

  //function
  //タスク追加時ハンドラー
  const handleAddTask = React.useCallback(
    (createTaskName: string) => {
      //ローカルタスクリスト情報だけ先に更新
      const newTasks = [...tasks];
      newTasks.push({ name: createTaskName } as TaskInfo);
      setTasks(newTasks);

      //タスクリストに新しいタスクを追加し、再取得
      updateTasks(
        createTaskName,
        location.state.taskFolderInfo.taskFolderId
      ).then((tasks) => {
        //最新のタスクリストをセット
        setTasks(tasks);
      });
    },
    [tasks, setTasks, updateTasks, location.state.taskFolderInfo.taskFolderId]
  );

  return (
    <FormProvider {...methods}>
      <TasksTemplate
        taskFolder={location.state.taskFolderInfo}
        tasks={tasks}
        handleAddTask={handleAddTask}
      />
    </FormProvider>
  );
};
