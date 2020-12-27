import firebase from "firebase";
import { AddTaskReq, UpdateTaskReq } from "../common/dto/task";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { TaskRepositoryInterface } from "./interfaces/task-interface";
import { COLLECTION_NAME_TASKS } from "./repository-helper";
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

      //リクエスト作成
      const req = new AddTaskReq();
      req.name = createTaskName;
      req.taskFolderId = taskFolderId;

      //タスク追加
      const ref = await this._db.collection(COLLECTION_NAME_TASKS).doc();
      await ref.set({ ...req });
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
