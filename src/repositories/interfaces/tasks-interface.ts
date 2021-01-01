import { TaskInfo } from "../../common/dto/task";
import { Listener } from "../../core/listener";

export interface TasksRepositoryInterface {
  /**
   * タスク情報リスト取得
   * @param taskFolderId フォルダーID
   * @param listener リスナー
   * @return tasks タスクリスト
   */
  getByFolderId: (
    taskFolderId: string,
    listener?: Listener
  ) => Promise<TaskInfo[]>;

  /**
   * タスク削除(複数)
   * @param taskFolderId フォルダーId
   * @param tasks タスクリスト
   * @param listener リスナー
   */
  delete: (
    taskFolderId: string,
    tasks: TaskInfo[],
    listener?: Listener
  ) => void;
}
