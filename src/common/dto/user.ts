/** ユーザー情報型 */
export class UserInfo {
  /** ユーザーID */
  userId: string = "";
  /** ニックネーム */
  name: string = "";
  /** タスクフォルダーIDリスト */
  taskFolderIdList: string[] = [];
}

/** ユーザ-作成リクエスト */
export class CreateUserReq {
  /** メールアドレス */
  email: string = "";
  /** パスワード */
  password: string = "";
}

/** ユーザーログインリクエスト */
export class LoginReq {
  /** メールアドレス */
  email: string = "";
  /** パスワード */
  password: string = "";
}
