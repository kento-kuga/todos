import { TaskInfo } from "../common/dto/task";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { COLLECTION_NAME_TASKS } from "./repositoryHelper";

/**
 * タスク情報リスト取得
 * @param folderId フォルダーID
 * @param listener リスナー
 * @return tasks タスクリスト
 */
export const getTasks = async (folderId: string, listener: Listener) => {
  const db = Firebase.instance.db;

  try {
    listener.started();

    const tasks = [] as TaskInfo[];

    //tasks取得
    //フォルダーIdが一致するタスクを抽出し取得する。
    await db
      .collection(COLLECTION_NAME_TASKS)
      .where("taskFolderId", "==", folderId)
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
    listener.finished();
  }
};
