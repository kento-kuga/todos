import { TaskFolderInfo } from "../../common/dto/task-folder";
import { UserInfo } from "../../common/dto/user";
import { Listener } from "../../core/listener";

export interface TaskFoldersRepositoryInterface {
  /**
   * タスク情報フォルダーリスト取得
   * @param folderIdList フォルダーIDリスト
   * @param listener リスナー
   * @return taskFolders タスクフォルダーリスト
   */
  getByFolderIdList: (
    folderIdList: string[],
    listener: Listener
  ) => Promise<TaskFolderInfo[] | undefined>;

  /**
   * タスクフォルダーリスト削除
   * @param deleteTaskFolderIdList フォルダーIDリスト
   * @param userInfo ユーザー情報
   * @param listener リスナー
   */
  delete: (
    deleteTaskFolderIdList: string[],
    userInfo: UserInfo,
    listener: Listener
  ) => void;
}
