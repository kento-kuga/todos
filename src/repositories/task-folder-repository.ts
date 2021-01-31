import {
  TaskFolderCreateReq,
  TaskFolderUpdateReq,
} from "../common/dto/task-folder";
import { UpdateUserInfo, UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import firebase from "firebase";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { COLLECTION_NAME_FOLDERS } from "./repository-helper";
import { TaskFolderRepositoryInterface } from "./interfaces/task-folder-repository-interface";
import { UserRepository } from "./user-repository";

export class TaskFolderRepository implements TaskFolderRepositoryInterface {
  //dbインスタンス
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = Firebase.instance.db;
  }

  /** タスクフォルダー作成 */
  create = async (
    createFolderName: string,
    userInfo: UserInfo | null,
    listener: Listener
  ) => {
    //ユーザー情報がなければ何もしない
    if (!userInfo) return;

    //ユーザーリポジトリ
    const User = new UserRepository();

    try {
      listener.started();

      //リクエスト作成
      const taskFolder = new TaskFolderCreateReq();
      taskFolder.folderName = createFolderName;
      taskFolder.members.push({ name: "", userId: userInfo.userId });

      //タスクフォルダー作成
      const ref = await this._db.collection(COLLECTION_NAME_FOLDERS).doc();
      await ref.set({ ...taskFolder });

      //ユーザーのフォルダーリストにも追加。
      const tmpTaskFolder = [...userInfo.taskFolderIdList];
      tmpTaskFolder.push(ref.id);

      const req = new UpdateUserInfo();
      req.taskFolderIdList = tmpTaskFolder;

      await User.update(userInfo.userId, req, listener);
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener.finished();
    }
  };

  /** タスクフォルダー更新 */
  update = async (
    taskFolderId: string,
    updateFolderParam: TaskFolderUpdateReq,
    listener: Listener
  ) => {
    try {
      listener.started();

      await this._db
        .collection(COLLECTION_NAME_FOLDERS)
        .doc(taskFolderId)
        .update({ ...updateFolderParam });
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener.finished();
    }
  };

  /** タスク数更新 */
  updateTaskNumber = async (
    taskFolderId: string,
    taskNumber: number,
    listener?: Listener
  ) => {
    try {
      listener && listener.started();

      const folderRef = await this._db
        .collection(COLLECTION_NAME_FOLDERS)
        .doc(taskFolderId);
      folderRef.update({
        taskNumber: firebase.firestore.FieldValue.increment(taskNumber),
      });
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener && listener.finished();
    }
  };
}
