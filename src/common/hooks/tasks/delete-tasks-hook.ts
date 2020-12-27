import { deleteTasks, getTasks } from "../../../repositories/task-repository";
import { useAppContextState } from "../../context/app-context";
import { TaskInfo } from "../../dto/task";
import { useTasks } from "./tasks-hook";

/** タスク追加Hooks */
export const useDeleteTasks = () => {
  //hooks
  const appContextState = useAppContextState();

  //state
  //タスクリスト
  const [, setTasks] = useTasks();

  //渡されたタスクリストのタスクを削除する。
  const deleteTask = async (tasks: TaskInfo[], taskFolderId: string) => {
    //タスク削除
    await deleteTasks(tasks, appContextState.appListener);

    //タスクリスト再取得
    getTasks(taskFolderId, appContextState.appListener).then((tasks) =>
      setTasks(tasks)
    );
  };

  return deleteTask;
};
