import { addTask, getTasks } from "../../../repositories/task-repository";
import { useTasks } from "./tasks-hook";

/** タスク追加Hooks */
export const useAddTask = () => {
  //state
  //タスクリスト
  const [, setTasks] = useTasks();

  //taskを追加し、最新のタスクリストを返す。
  const addTaskTmp = async (createTaskName: string, taskFolderId: string) => {
    //タスク追加
    await addTask(createTaskName, taskFolderId);

    //タスクリスト再取得
    getTasks(taskFolderId).then((tasks) => setTasks(tasks));
  };

  return addTaskTmp;
};
