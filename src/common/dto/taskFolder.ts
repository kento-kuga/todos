import { TaskInfo } from "./task";
import { UserInfo } from "./user";

/** タスクフォルダー作成リクエスト型 */
export class TaskFolderCreateReq {
  /** タスクフォルダー名 */
  folderName: string = "";
  /** メンバーリスト */
  members: TaskFolderCreateMember[] = [];
}

/** タスクフォルダー作成メンバー型 */
export class TaskFolderCreateMember {
  /** ニックネーム */
  name: string = "";
  /** ユーザーID */
  userId: string = "";
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

/** タスクフォルダー作成フォームのparam型 */
export class createTaskFolderForm {
  /** フォルダー名 */
  folderName: string = "";
}
