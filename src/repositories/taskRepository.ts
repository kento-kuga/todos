import { TaskFolder } from "../common/dto/app";
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

    const taskFolders = [] as TaskFolder[];

    for (const id of folderIdList) {
      const doc = await db.collection("taskFolder").doc(id).get();
      const data = await doc.data();

      if (data) {
        const taskFolder = { ...data } as TaskFolder;
        taskFolder.taskFolderId = doc.id;

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
