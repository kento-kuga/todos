import { TaskFolderInfo } from "./task-folder";

/** タスク情報型 */
export class TaskInfo {
  /** タスクフォルダーId */
  taskFolderId: string = "";
  /** タスクID */
  taskId: string = "";
  /** 作成者 */
  creator: string = "";
  /** 作成日時 */
  createdAt: Date = new Date();
  /** タスク名称 */
  name: string = "";
  /** 期限 */
  period?: Date;
  /** 優先度 */
  priority?: number;
  /** 完了済みフラグ */
  completed: boolean = false;
}

/** タスクリスト画面ロケーション型 */
export class TasksLocationState {
  /** タスクフォルダー情報 */
  taskFolderInfo: TaskFolderInfo = new TaskFolderInfo();
}

/** タスク追加リクエスト型 */
export class AddTaskReq {
  /** 追加タスク名 */
  name: string = "";
  /** タスクフォルダーId */
  taskFolderId: string = "";
  /** 作成日時 */
  createdAt: Date = new Date();
}

/** タスク更新リクエスト型 */
export class UpdateTaskReq {
  /** 更新タスク名 */
  name: string = "";
  /** 完了済みフラグ */
  completed: boolean = false;
}

/** タスク作成フォームのparam型 */
interface CreateTaskFormParams {
  /** 作成フォルダー名 */
  createTaskName: string;
}

/** タスクリストページのparam型 */
export class TasksFormParams implements CreateTaskFormParams {
  createTaskName: string = "";
}
