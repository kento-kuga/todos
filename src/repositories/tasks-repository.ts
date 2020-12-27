import firebase from "firebase";
import Firebase from "../core/firebase";
import { TaskInfo } from "../common/dto/task";
import { SystemError } from "../core/error";
import { Listener } from "../core/listener";
import { COLLECTION_NAME_TASKS } from "./repository-helper";
import { TasksRepositoryInterface } from "./interfaces/tasks-interface";

export class TasksRepository implements TasksRepositoryInterface {
  //dbインスタンス
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = Firebase.instance.db;
  }

  /** タスクリスト取得 */
  getByFolderId = async (folderId: string, listener?: Listener) => {
    try {
      listener && listener.started();

      const tasks = [] as TaskInfo[];

      //tasks取得
      //フォルダーIdが一致するタスクを抽出し取得する。
      await this._db
        .collection(COLLECTION_NAME_TASKS)
        .where("taskFolderId", "==", folderId)
        .orderBy("createdAt", "asc")
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
  delete = async (tasks: TaskInfo[], listener?: Listener) => {
    try {
      listener && listener.started();

      //タスク削除
      for (const task of tasks) {
        await this._db
          .collection(COLLECTION_NAME_TASKS)
          .doc(task.taskId)
          .delete();
      }
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener && listener.finished();
    }
  };
}
