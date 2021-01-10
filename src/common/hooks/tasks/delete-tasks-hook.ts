import { TasksRepository } from "../../../repositories/tasks-repository";
import { useAppContext, useAppContextState } from "../../context/app-context";
import { TaskInfo } from "../../dto/task";
import { useTasks } from "./tasks-hook";

/** タスク追加Hooks */
export const useDeleteTasks = () => {
  //repository
  //タスクリストリポジトリ
  const Tasks = new TasksRepository();

  //context
  //アプリコンテキスト
  const [state] = useAppContext();

  //hooks
  const appContextState = useAppContextState();

  //state
  //タスクリスト
  const [tasks, setTasks] = useTasks();

  //渡されたタスクリストのタスクを削除する。
  const deleteTask = async (deleteTasks: TaskInfo[], taskFolderId: string) => {
    if (state.isTryUser) {
      //体験ユーザーの場合
      //タスクリストから削除対象のタスクを排除
      const tmpTasks = [...(tasks || [])].filter(
        (task) =>
          !deleteTasks.some((deleteTask) => deleteTask.taskId === task.taskId)
      );

      //コンテキストにセット
      setTasks(tmpTasks);
    } else {
      //体験ユーザーではない場合
      //タスク削除
      await Tasks.delete(
        taskFolderId,
        deleteTasks,
        appContextState.appListener
      );

      //タスクリスト再取得
      Tasks.getByFolderId(
        taskFolderId,
        appContextState.appListener
      ).then((tasks) => setTasks(tasks));
    }
  };

  return deleteTask;
};
