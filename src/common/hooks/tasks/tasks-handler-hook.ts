import React from "react";
import { TaskInfo } from "../../dto/task";
import { useAddTask } from "./add-task-hook";
import { useDeleteTasks } from "./delete-tasks-hook";
import { useTaskFolder } from "./task-folder-hook";
import { useTasks } from "./tasks-hook";
import { useUpdateTask } from "./update-task";

/**
 * タスクハンドラーフックス
 */
export const useTasksHandler = () => {
  //hooks
  //タスク追加フック
  const addTask = useAddTask();
  //タスクリスト削除フック
  const deleteTasks = useDeleteTasks();
  //タスク更新フック
  const updateTask = useUpdateTask();

  //state
  //タスクリスト
  const [tasks, setTasks] = useTasks();
  //タスクフォルダー
  const [taskFolder] = useTaskFolder();

  //function
  //タスク追加時ハンドラー
  const handleAddTask = React.useCallback(
    (createTaskName: string) => {
      //タスクリストかタスクフォルダーが取得されていなければ何もしない
      if (!tasks || !taskFolder) return;

      //ローカルタスクリスト情報だけ先に更新
      const newTasks = [...tasks];
      newTasks.push({ name: createTaskName } as TaskInfo);
      setTasks(newTasks);

      //タスクリストに新しいタスクを追加し、再取得
      addTask(createTaskName, taskFolder.taskFolderId);
    },
    [tasks, taskFolder, setTasks, addTask]
  );

  //完了済タスク削除ボタン押下時ハンドラ
  const handleClickCompletedTaskDelete = React.useCallback(
    (completedTasks: TaskInfo[]) => {
      //タスクフォルダーがなければ何もしない。
      if (!taskFolder) return;

      if (completedTasks.length > 0) {
        //完了済タスクが存在するなら、タスクを削除する。
        deleteTasks(completedTasks, taskFolder.taskFolderId);
      }
    },
    [deleteTasks, taskFolder]
  );

  //タスク完了状態変更時ハンドラ-
  const handleChangeTaskCompleted = React.useCallback(
    (task: TaskInfo, completed: boolean) => {
      //タスクリストが取得されていなければ何もしない
      if (!tasks) return;

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

  return {
    handleAddTask,
    handleClickCompletedTaskDelete,
    handleChangeTaskCompleted,
  };
};
