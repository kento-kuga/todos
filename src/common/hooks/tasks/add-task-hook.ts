import { TaskRepository } from "../../../repositories/task-repository";
import { TasksRepository } from "../../../repositories/tasks-repository";
import { useTasks } from "./tasks-hook";

/** タスク追加Hooks */
export const useAddTask = () => {
  //repository
  //タスクリポジトリ
  const Task = new TaskRepository();
  //タスクリストリポジトリ
  const Tasks = new TasksRepository();

  //state
  //タスクリスト
  const [, setTasks] = useTasks();

  //taskを追加し、最新のタスクリストを返す。
  const addTaskTmp = async (createTaskName: string, taskFolderId: string) => {
    //タスク追加
    await Task.add(createTaskName, taskFolderId);

    //タスクリスト再取得
    Tasks.getByFolderId(taskFolderId).then((tasks) => setTasks(tasks));
  };

  return addTaskTmp;
};
