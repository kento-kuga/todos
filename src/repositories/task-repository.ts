import { AddTaskReq, TaskInfo, UpdateTaskReq } from "../common/dto/task";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { COLLECTION_NAME_TASKS } from "./repository-helper";

/**
 * タスク情報リスト取得
 * @param folderId フォルダーID
 * @param listener リスナー
 * @return tasks タスクリスト
 */
export const getTasks = async (folderId: string, listener?: Listener) => {
  const db = Firebase.instance.db;

  try {
    listener && listener.started();

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
    listener && listener.finished();
  }
};

/**
 * タスク追加
 * @param createTaskName 作成するタスク名
 * @param taskFolderId タスクフォルダID
 * @param listener リスナ~
 */
export const addTask = async (
  createTaskName: string,
  taskFolderId: string,
  listener?: Listener
) => {
  const db = Firebase.instance.db;

  try {
    listener && listener.started();

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
    listener && listener.finished();
  }
};

/**
 * タスク更新
 * @param taskId タスクID
 * @param updateTaskParam タスク更新パラメーター
 * @param listener リスナー
 */
export const updateTask = async (
  taskId: string,
  updateTaskParam: UpdateTaskReq,
  listener?: Listener
) => {
  const db = Firebase.instance.db;

  try {
    listener && listener.started();

    //タスク更新
    await db
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

/**
 * タスク削除(複数)
 * @param tasks
 * @param listener
 */
export const deleteTasks = async (tasks: TaskInfo[], listener?: Listener) => {
  const db = Firebase.instance.db;

  try {
    listener && listener.started();

    //タスク削除
    for (const task of tasks) {
      await db.collection(COLLECTION_NAME_TASKS).doc(task.taskId).delete();
    }
  } catch (e) {
    console.error(e);
    throw new SystemError();
  } finally {
    listener && listener.finished();
  }
};
