import firebase from "firebase";
import { AddTaskReq, UpdateTaskReq } from "../common/dto/task";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { TaskRepositoryInterface } from "./interfaces/task-interface";
import { COLLECTION_NAME_TASKS } from "./repository-helper";
import { TaskFolderRepository } from "./task-folder-repository";
export class TaskRepository implements TaskRepositoryInterface {
  //dbインスタンス
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = Firebase.instance.db;
  }

  /** タスク追加 */
  add = async (
    createTaskName: string,
    taskFolderId: string,
    listener?: Listener
  ) => {
    try {
      listener && listener.started();

      //タスクフォルダーリポジトリ
      const TaskFolder = new TaskFolderRepository();

      //リクエスト作成
      const req = new AddTaskReq();
      req.name = createTaskName;
      req.taskFolderId = taskFolderId;

      //タスク追加
      const taskRef = await this._db.collection(COLLECTION_NAME_TASKS).doc();
      await taskRef.set({ ...req });

      //タスクフォルダーのタスク数を増加。
      TaskFolder.updateTaskNumber(taskFolderId, 1, listener);
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener && listener.finished();
    }
  };

  /** タスク更新 */
  update = async (
    taskId: string,
    updateTaskParam: UpdateTaskReq,
    listener?: Listener
  ) => {
    try {
      listener && listener.started();

      //タスク更新
      await this._db
        .collection(COLLECTION_NAME_TASKS)
        .doc(taskId)
        .update({ ...updateTaskParam });
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener && listener.finished();
    }
  };
}
