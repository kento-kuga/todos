/** ユーザー情報型 */
export class UserInfo {
  /** ユーザーID */
  userId: string = "";
  /** ニックネーム */
  name: string = "";
  /** タスクフォルダーリスト */
  taskFolders: TaskFolder[] = [];
}

/** タスクフォルダー型 */
export class TaskFolder {
  /** タスクフォルダーID */
  taskFolderId: string = "";
  /** メンバーリスト */
  members: string[] = [];
  /** タスクリスト */
  tasks: Task[] = [];
}

/** タスク型 */
export class Task {
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
