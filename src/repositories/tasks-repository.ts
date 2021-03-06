import firebase from "firebase";
import Firebase from "../core/firebase";
import { TaskInfo } from "../common/dto/task";
import { SystemError } from "../core/error";
import { Listener } from "../core/listener";
import { COLLECTION_NAME_TASKS } from "./repository-helper";
import { TasksRepositoryInterface } from "./interfaces/tasks-interface";
import { TaskFolderRepository } from "./task-folder-repository";

export class TasksRepository implements TasksRepositoryInterface {
  //dbインスタンス
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = Firebase.instance.db;
  }

  /** タスクリスト取得 */
  getByFolderId = async (taskFolderId: string, listener?: Listener) => {
    try {
      listener && listener.started();

      const tasks = [] as TaskInfo[];

      //tasks取得
      //フォルダーIdが一致するタスクを抽出し取得する。
      await this._db
        .collection(COLLECTION_NAME_TASKS)
        .where("taskFolderId", "==", taskFolderId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const info = { taskId: doc.id, ...doc.data() } as TaskInfo;
            tasks.push(info);
          });
        });
      return tasks;
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener && listener.finished();
    }
  };

  /** タスクリスト削除 */
  delete = async (
    taskFolderId: string,
    tasks: TaskInfo[],
    listener?: Listener
  ) => {
    try {
      listener && listener.started();

      //タスクフォルダーリポジトリ
      const TaskFolder = new TaskFolderRepository();

      //タスク削除
      for (const task of tasks) {
        await this._db
          .collection(COLLECTION_NAME_TASKS)
          .doc(task.taskId)
          .delete();
      }

      //タスクフォルダーのタスク数を増加。
      TaskFolder.updateTaskNumber(taskFolderId, -tasks.length, listener);
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener && listener.finished();
    }
  };
}
