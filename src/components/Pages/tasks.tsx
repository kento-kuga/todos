import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  TaskInfo,
  TasksFormParams,
  TasksLocationState,
} from "../../common/dto/task";
import { useAddTask } from "../../common/hooks/useAddTask";
import { useTasks } from "../../common/hooks/useTasks";
import { TasksTemplate } from "../Templates/tasks-template";
import { useUpdateTask } from "../../common/hooks/useUpdateTask";

interface Props {}

export const Tasks = (props: Props) => {
  //hooks
  //ロケーション
  const location = useLocation<TasksLocationState>();
  //フォームパーツ
  const methods = useForm<TasksFormParams>();
  //タスク追加Hook
  const addTask = useAddTask();
  //タスク更新Hook
  const updateTask = useUpdateTask();

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
      addTask(createTaskName, location.state.taskFolderInfo.taskFolderId);
    },
    [tasks, setTasks, addTask, location.state.taskFolderInfo.taskFolderId]
  );

  //タスク完了状態変更時ハンドラ-
  const handleChangeTaskCompleted = React.useCallback(
    (task: TaskInfo, completed: boolean) => {
      //渡された添字のタスクの選択状態を変更し、タスクリストを更新する。
      const tmpTasks = [...tasks];
      //タスクIDで対象のタスクを抽出
      const tmpTask = tmpTasks.find(
        (tmpTask) => tmpTask.taskId === task.taskId
      );
      if (tmpTask) {
        //対象のタスクが存在する場合、対象タスクの完了状態を更新
        tmpTask.completed = completed;
        setTasks(tmpTasks);

        //DBのタスクを更新
        updateTask(tmpTask, task.taskFolderId);
      }
    },
    [setTasks, tasks, updateTask]
  );

  return (
    <FormProvider {...methods}>
      <TasksTemplate
        taskFolder={location.state.taskFolderInfo}
        tasks={tasks}
        handleChangeTaskCompleted={handleChangeTaskCompleted}
        handleAddTask={handleAddTask}
      />
    </FormProvider>
  );
};
