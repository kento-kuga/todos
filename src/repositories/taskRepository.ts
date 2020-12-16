import { AddTaskReq, TaskInfo } from "../common/dto/task";
import { UserInfo } from "../common/dto/user";
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
export const getTasks = async (folderId: string, listener?: Listener) => {
  const db = Firebase.instance.db;

  try {
    if (listener) {
      listener.started();
    }
    const tasks = [] as TaskInfo[];

    //tasks取得
    //フォルダーIdが一致するタスクを抽出し取得する。
    await db
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
    if (listener) {
      listener.finished();
    }
  }
};

export const addTask = async (
  createTaskName: string,
  taskFolderId: string,
  listener?: Listener
) => {
  const db = Firebase.instance.db;

  try {
    if (listener) {
      listener.started();
    }
    //リクエスト作成
    const req = new AddTaskReq();

    req.name = createTaskName;
    req.taskFolderId = taskFolderId;

    //タスク追加
    const ref = await db.collection(COLLECTION_NAME_TASKS).doc();
    await ref.set({ ...req });
  } catch (e) {
    console.error(e);
    throw new SystemError();
  } finally {
    if (listener) {
      listener.finished();
    }
  }
};
