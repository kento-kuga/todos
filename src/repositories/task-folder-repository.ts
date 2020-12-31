import {
  TaskFolderCreateReq,
  TaskFolderInfo,
  TaskFolderUpdateReq,
} from "../common/dto/task-folder";
import { UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import firebase from "firebase";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import {
  COLLECTION_NAME_FOLDERS,
  COLLECTION_NAME_TASKS,
  COLLECTION_NAME_USERS,
} from "./repository-helper";

/**
 * タスク情報フォルダーリスト取得
 * @param folderIdList フォルダーIDリスト
 * @param listener リスナー
 * @return taskFolders タスクフォルダーリスト
 */
export const getTaskFolders = async (
  folderIdList: string[],
  listener: Listener
) => {
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

/**
 * タスクフォルダー作成
 * @param createFolderName フォルダーの名前
 * @param userInfo ユーザー情報
 * @param listener リスナー
 */
export const createTaskFolder = async (
  createFolderName: string,
  userInfo: UserInfo,
  listener: Listener
) => {
  const db = Firebase.instance.db;

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

/**
 * タスクフォルダー削除
 * @param deleteTaskFolderIdList フォルダーIDリスト
 * @param userInfo ユーザー情報
 * @param listener リスナー
 */
export const deleteTaskFolders = async (
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
      console.log(
        "🚀 ~ file: task-folder-repository.ts ~ line 134 ~ tasks",
        tasks
      );

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

/**
 * タスクフォルダー更新
 * @param taskFolderId タスクフォルダーID
 * @param updateFolderParam タスクフォルダー更新パラメータ
 * @param listener リスナー
 */
export const updateTaskFolder = async (
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
