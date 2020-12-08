import { TaskFolderInfo } from "./taskFolder";

/** タスク情報型 */
export class TaskInfo {
  /** タスクID */
  taskId: string = "";
  /** 作成者 */
  creator: string = "";
  /** 作成日時 */
  date: Date = new Date();
  /** コンテンツ */
  content: string = "";
  /** 期限 */
  period?: Date;
  /** 優先度 */
  priority?: number;
}

/** タスクリスト画面ロケーション型 */
export class TasksLocationState {
  /** タスクフォルダー情報 */
  taskFolderInfo: TaskFolderInfo = new TaskFolderInfo();
}
