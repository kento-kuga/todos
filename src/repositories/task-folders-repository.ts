import firebase from "firebase";
import { TaskFolderInfo } from "../common/dto/task-folder";
import { UpdateUserInfo, UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { TaskFoldersRepositoryInterface } from "./interfaces/task-folders-repository-interface";
import {
  COLLECTION_NAME_FOLDERS,
  COLLECTION_NAME_TASKS,
} from "./repository-helper";
import { UserRepository } from "./user-repository";

export class TaskFoldersRepository implements TaskFoldersRepositoryInterface {
  //dbインスタンス
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = Firebase.instance.db;
  }

  /** タスクフォルダーリスト取得 */
  getByFolderIdList = async (folderIdList: string[], listener: Listener) => {
    if (folderIdList.length < 1) return;

    try {
      listener.started();

      const taskFolders = [] as TaskFolderInfo[];

      //Folders取得
      for (const folderId of folderIdList) {
        //コレクション取得
        const collection = await this._db
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
    userInfo: UserInfo | null,
    listener: Listener
  ) => {
    //ユーザー情報がなければ何もしない
    if (!userInfo) return;

    //ユーザーリポジトリ
    const User = new UserRepository();

    try {
      listener.started();

      for (const id of deleteTaskFolderIdList) {
        //タスクフォルダー削除
        await this._db.collection(COLLECTION_NAME_FOLDERS).doc(id).delete();

        //タスクリスト削除
        //バッチ作成
        const batchArray: firebase.firestore.WriteBatch[] = [];
        batchArray.push(this._db.batch());
        let operationCounter = 0;
        let batchIndex = 0;

        //タスクリスト取得
        const tasks = await this._db
          .collection(COLLECTION_NAME_TASKS)
          .where("taskFolderId", "==", id)
          .get();

        //削除実行
        await tasks.forEach((doc) => {
          batchArray[batchIndex].delete(doc.ref);
          operationCounter++;

          if (operationCounter === 499) {
            batchArray.push(this._db.batch());
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
      //リクエスト作成
      const req = new UpdateUserInfo();
      req.taskFolderIdList = tmpTaskFolder;
      User.update(userInfo.userId, req, listener);
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener.finished();
    }
  };
}
