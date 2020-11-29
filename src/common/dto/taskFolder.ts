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

/** タスクフォルダー更新リクエスト型 */
export class TaskFolderUpdateReq {
  /** タスクフォルダー名 */
  folderName?: string;
  /** メンバーリスト */
  members?: TaskFolderCreateMember;
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
export class CreateTaskFolderFormParams {
  /** フォルダー名 */
  folderName: string = "";
}

/** タスクフォルダーネーム更新フォームのparam型 */
export class UpdateTaskFolderFormParams {
  /** フォルダー名 */
  folderName: string = "";
}
