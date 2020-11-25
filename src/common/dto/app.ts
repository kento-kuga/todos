/** ユーザー情報型 */
export class UserInfo {
  /** ユーザーID */
  userId: string = "";
  /** ニックネーム */
  name: string = "";
  /** タスクフォルダーIDリスト */
  taskFolderIdList: string[] = [];
}

/** タスクフォルダー情報型 */
export class TaskFolderInfo {
  /** タスクフォルダーID */
  taskFolderId: string = "";
  /** フォルダー名 */
  folderName: string = "";
  /** メンバーリスト */
  members: UserInfo[] = [];
  /** タスクリスト */
  tasks: TaskInfo[] = [];
}

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
