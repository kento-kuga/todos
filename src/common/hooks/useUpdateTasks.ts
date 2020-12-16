import { addTask, getTasks } from "../../repositories/taskRepository";

/** タスク追加Hooks */
export const useUpdateTasks = () => {
  //taskを追加し、最新のタスクリストを返す。
  const updateTasks = async (createTaskName: string, taskFolderId: string) => {
    //タスク追加
    addTask(createTaskName, taskFolderId);

    //タスクリスト再取得
    const tasks = getTasks(taskFolderId);

    return tasks;
  };

  return updateTasks;
};
