import { TaskRepository } from "../../../repositories/task-repository";
import { TasksRepository } from "../../../repositories/tasks-repository";
import { useAppContext } from "../../context/app-context";
import { TaskInfo } from "../../dto/task";
import { createRandomString } from "../../helper/util-function";
import { useTasks } from "./tasks-hook";

/** タスク追加Hooks */
export const useAddTask = () => {
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

  //taskを追加し、最新のタスクリストを返す。
  const addTask = async (createTaskName: string, taskFolderId: string) => {
    if (state.isTryUser) {
      //体験ユーザーの場合
      //タスク作成
      const tmpTask = new TaskInfo();
      tmpTask.name = createTaskName;
      tmpTask.taskFolderId = taskFolderId;
      tmpTask.taskId = createRandomString();

      //コンテキストにセット
      const tmpTasks = [...(tasks || [])];
      tmpTasks.push(tmpTask);
      setTasks(tmpTasks);
    } else {
      //体験ユーザーではない場合
      //タスク追加
      await Task.add(createTaskName, taskFolderId);

      //タスクリスト再取得
      Tasks.getByFolderId(taskFolderId).then((tasks) => setTasks(tasks));
    }
  };

  return addTask;
};
