import { TaskInfo } from "../../common/dto/task";
import { Listener } from "../../core/listener";

export interface TasksRepositoryInterface {
  /**
   * タスク情報リスト取得
   * @param folderId フォルダーID
   * @param listener リスナー
   * @return tasks タスクリスト
   */
  getByFolderId: (folderId: string, listener?: Listener) => Promise<TaskInfo[]>;

  /**
   * タスク削除(複数)
   * @param tasks
   * @param listener
   */
  delete: (tasks: TaskInfo[], listener?: Listener) => void;
}
