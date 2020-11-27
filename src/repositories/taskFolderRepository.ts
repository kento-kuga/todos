import { TaskInfo } from "../common/dto/task";
import { TaskFolderCreateReq, TaskFolderInfo } from "../common/dto/taskFolder";
import { UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "./listener";

/** タスクフォルダー情報取得 */
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
      const collection = await db.collection("taskFolders").doc(folderId).get();

      if (collection.exists) {
        //コレクションが取得できた場合
        //dtoにマッピング
        const taskFolder = { ...collection.data() } as TaskFolderInfo;
        taskFolder.taskFolderId = collection.id;

        //Task取得
        const taskList = [] as TaskInfo[];

        await collection.ref
          .collection("task")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              const task = { ...data } as TaskInfo;
              taskList.push(task);
            });
          })
          .catch((e) => console.error(e));

        taskFolder.tasks = taskList;
        taskFolders.push(taskFolder);
      }
    }

    return taskFolders;
  } catch {
    throw new SystemError();
  } finally {
    listener.finished();
  }
};

/** タスクフォルダー作成 */
export const createTaskFolder = async (
  folderName: string,
  userInfo: UserInfo,
  listener: Listener
) => {
  const db = Firebase.instance.db;

  try {
    listener.started();

    //リクエスト作成
    //TODO リクエスト用の型を作成
    const taskFolder = new TaskFolderCreateReq();
    taskFolder.folderName = folderName;
    taskFolder.members.push({ name: userInfo.name, userId: userInfo.userId });

    //タスクフォルダー作成
    const ref = await db.collection("taskFolders").doc();
    await ref.set({ ...taskFolder });

    //ユーザーのフォルダーリストにも追加。
    const tmpTaskFolder = [...userInfo.taskFolderIdList];
    tmpTaskFolder.push(ref.id);

    await db.collection("users").doc(userInfo.userId).update({
      taskFolderIdList: tmpTaskFolder,
    });
  } catch (e) {
    throw new SystemError();
  } finally {
    listener.finished();
  }
};
