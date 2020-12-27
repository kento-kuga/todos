import { TaskRepository } from "../../../repositories/task-repository";
import { TasksRepository } from "../../../repositories/tasks-repository";
import { TaskInfo, UpdateTaskReq } from "../../dto/task";
import { useTasks } from "./tasks-hook";

/** タスク更新フック */
export const useUpdateTask = () => {
  //repository
  //タスクリポジトリ
  const Task = new TaskRepository();
  //タスクリストリポジトリ
  const Tasks = new TasksRepository();

  //state
  //タスクリスト
  const [, setTasks] = useTasks();

  const updateTaskInfo = async (task: TaskInfo, taskFolderId: string) => {
    //更新パラメータ＝作成
    const param = new UpdateTaskReq();
    param.name = task.name;
    param.completed = task.completed;

    //タスク更新
    await Task.update(task.taskId, param);

    //タスクリスト再取得
    await Tasks.getByFolderId(taskFolderId).then((tasks) => setTasks(tasks));
  };

  return updateTaskInfo;
};
