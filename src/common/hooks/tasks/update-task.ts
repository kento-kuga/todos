import { TaskRepository } from "../../../repositories/task-repository";
import { TasksRepository } from "../../../repositories/tasks-repository";
import { useAppContext } from "../../context/app-context";
import { TaskInfo, UpdateTaskReq } from "../../dto/task";
import { useTasks } from "./tasks-hook";

/** タスク更新フック */
export const useUpdateTask = () => {
  //repository
  //タスクリポジトリ
  const Task = new TaskRepository();
  //タスクリストリポジトリ
  const Tasks = new TasksRepository();

  //context
  //アプリコンテキスト
  const [state] = useAppContext();

  //state
  //タスクリスト
  const [tasks, setTasks] = useTasks();

  const updateTaskInfo = async (task: TaskInfo, taskFolderId: string) => {
    if (state.isTryUser) {
      //体験ユーザーの場合
      //タスク更新
      const tmpTasks = [...(tasks || [])];
      const tmpTask = tmpTasks.find(
        (tmpTask) => tmpTask.taskId === task.taskId
      );
      if (tmpTask) {
        tmpTask.name = task.name;
        tmpTask.completed = task.completed;
      }
      //コンテキストにセット
      setTasks(tmpTasks);
    } else {
      //体験ユーザーではない場合
      //更新パラメータ＝作成
      const param = new UpdateTaskReq();
      param.name = task.name;
      param.completed = task.completed;

      //タスク更新
      await Task.update(task.taskId, param);

      //タスクリスト再取得
      await Tasks.getByFolderId(taskFolderId).then((tasks) => setTasks(tasks));
    }
  };

  return updateTaskInfo;
};
