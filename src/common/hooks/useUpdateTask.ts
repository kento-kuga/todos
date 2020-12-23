import { getTasks, updateTask } from "../../repositories/taskRepository";
import { TaskInfo, UpdateTaskReq } from "../dto/task";
import { useTasks } from "./useTasks";

/** タスク更新フック */
export const useUpdateTask = () => {
  //state
  //タスクリスト
  const [, setTasks] = useTasks();

  const updateTaskInfo = async (task: TaskInfo, taskFolderId: string) => {
    //更新パラメータ＝作成
    const param = new UpdateTaskReq();
    param.name = task.name;
    param.completed = task.completed;

    //タスク更新
    await updateTask(task.taskId, param);

    //タスクリスト再取得
    await getTasks(taskFolderId).then((tasks) => setTasks(tasks));
  };

  return updateTaskInfo;
};
