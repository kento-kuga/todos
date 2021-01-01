import firebase from "firebase";
import { TaskFolderInfo } from "../common/dto/task-folder";
import { UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { TaskFoldersRepositoryInterface } from "./interfaces/task-folders-repository-interface";
import {
  COLLECTION_NAME_FOLDERS,
  COLLECTION_NAME_TASKS,
  COLLECTION_NAME_USERS,
} from "./repository-helper";

export class TaskFoldersRepository implements TaskFoldersRepositoryInterface {
  //dbインスタンス
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = Firebase.instance.db;
  }

  /** タスクフォルダーリスト取得 */
  getByFolderIdList = async (folderIdList: string[], listener: Listener) => {
    const db = Firebase.instance.db;

    if (folderIdList.length < 1) return;

    try {
      listener.started();

      const taskFolders = [] as TaskFolderInfo[];

      //Folders取得
      for (const folderId of folderIdList) {
        //コレクション取得
        const collection = await db
          .collection(COLLECTION_NAME_FOLDERS)
          .doc(folderId)
          .get();

        if (collection.exists) {
          //コレクションが取得できた場合
          //dtoにマッピング
          const taskFolder = { ...collection.data() } as TaskFolderInfo;
          taskFolder.taskFolderId = collection.id;
          taskFolders.push(taskFolder);
        }
      }

      return taskFolders;
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener.finished();
    }
  };

  /** タスクフォルダー削除 */
  delete = async (
    deleteTaskFolderIdList: string[],
    userInfo: UserInfo,
    listener: Listener
  ) => {
    const db = Firebase.instance.db;

    try {
      listener.started();

      for (const id of deleteTaskFolderIdList) {
        //タスクフォルダー削除
        await db.collection(COLLECTION_NAME_FOLDERS).doc(id).delete();

        //タスクリスト削除
        //バッチ作成
        const batchArray: firebase.firestore.WriteBatch[] = [];
        batchArray.push(db.batch());
        let operationCounter = 0;
        let batchIndex = 0;

        //タスクリスト取得
        const tasks = await db
          .collection(COLLECTION_NAME_TASKS)
          .where("taskFolderId", "==", id)
          .get();

        //削除実行
        await tasks.forEach((doc) => {
          batchArray[batchIndex].delete(doc.ref);
          operationCounter++;

          if (operationCounter === 499) {
            batchArray.push(db.batch());
            batchIndex++;
            operationCounter = 0;
          }
        });
        //コミット
        batchArray.forEach(async (batch) => await batch.commit());
      }

      //ユーザーのフォルダーリストからも削除。
      const tmpTaskFolder = userInfo.taskFolderIdList.filter((id) => {
        //削除対象フォルダのidと一致するidは除外する。
        return deleteTaskFolderIdList.every((deleteId) => deleteId !== id);
      });

      //ユーザーのフォルダーリスト更新
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
}
