import { TasksRepository } from "../../../repositories/tasks-repository";
import { useAppContextState } from "../../context/app-context";
import { TaskInfo } from "../../dto/task";
import { useTasks } from "./tasks-hook";

/** タスク追加Hooks */
export const useDeleteTasks = () => {
  //repository
  //タスクリストリポジトリ
  const Tasks = new TasksRepository();

  //hooks
  const appContextState = useAppContextState();

  //state
  //タスクリスト
  const [, setTasks] = useTasks();

  //渡されたタスクリストのタスクを削除する。
  const deleteTask = async (tasks: TaskInfo[], taskFolderId: string) => {
    //タスク削除
    await Tasks.delete(taskFolderId, tasks, appContextState.appListener);

    //タスクリスト再取得
    Tasks.getByFolderId(
      taskFolderId,
      appContextState.appListener
    ).then((tasks) => setTasks(tasks));
  };

  return deleteTask;
};
