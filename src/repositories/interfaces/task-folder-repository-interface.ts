import { TaskFolderUpdateReq } from "../../common/dto/task-folder";
import { UserInfo } from "../../common/dto/user";
import { Listener } from "../../core/listener";

export interface TaskFolderRepositoryInterface {
  /**
   * タスクフォルダー作成
   * @param createFolderName フォルダーの名前
   * @param userInfo ユーザー情報
   * @param listener リスナー
   */
  create: (
    createFolderName: string,
    userInfo: UserInfo,
    listener: Listener
  ) => void;
  /**
   * タスクフォルダー更新
   * @param taskFolderId タスクフォルダーID
   * @param updateFolderParam タスクフォルダー更新パラメータ
   * @param listener リスナー
   */
  update: (
    taskFolderId: string,
    updateFolderParam: TaskFolderUpdateReq,
    listener: Listener
  ) => void;
}
