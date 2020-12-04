import { TaskInfo } from "./task";
import { UserInfo } from "./user";

/** タスクフォルダー作成リクエスト型 */
export class TaskFolderCreateReq {
  /** 作成フォルダー名 */
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
  /** 更新フォルダー名 */
  folderName: string = "";
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
interface CreateTaskFolderFormParams {
  /** 作成フォルダー名 */
  createFolderName: string;
}

/** タスクフォルダーネーム更新フォームのparam型 */
interface UpdateTaskFolderFormParams {
  /** 更新フォルダー名 */
  updateFolderName: string;
}

/** フォルダーリストページのparam型 */
export class FoldersFormParams
  implements CreateTaskFolderFormParams, UpdateTaskFolderFormParams {
  createFolderName: string = "";
  updateFolderName: string = "";
}
