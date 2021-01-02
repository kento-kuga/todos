import {
  TaskFolderCreateReq,
  TaskFolderUpdateReq,
} from "../common/dto/task-folder";
import { UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import firebase from "firebase";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import {
  COLLECTION_NAME_FOLDERS,
  COLLECTION_NAME_USERS,
} from "./repository-helper";
import { TaskFolderRepositoryInterface } from "./interfaces/task-folder-repository-interface";

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
    const db = Firebase.instance.db;

    //ユーザー情報がなければ何もしない
    if (!userInfo) return;

    try {
      listener.started();

      //リクエスト作成
      const taskFolder = new TaskFolderCreateReq();
      taskFolder.folderName = createFolderName;
      taskFolder.members.push({ name: userInfo.name, userId: userInfo.userId });

      //タスクフォルダー作成
      const ref = await db.collection(COLLECTION_NAME_FOLDERS).doc();
      await ref.set({ ...taskFolder });

      //ユーザーのフォルダーリストにも追加。
      const tmpTaskFolder = [...userInfo.taskFolderIdList];
      tmpTaskFolder.push(ref.id);

      await db.collection(COLLECTION_NAME_USERS).doc(userInfo.userId).update({
        taskFolderIdList: tmpTaskFolder,
      });
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
    const db = Firebase.instance.db;

    try {
      listener.started();

      await db
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
}
