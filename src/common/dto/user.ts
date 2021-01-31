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

/** ユーザー情報更新リクエスト */
export class UpdateUserInfo {
  /** ニックネーム */
  name?: string = "";
  /** タスクフォルダーIDリスト */
  taskFolderIdList?: string[] = [];
}

/** ユーザーログインリクエスト */
export class LoginReq {
  /** メールアドレス */
  email: string = "";
  /** パスワード */
  password: string = "";
}

/** ユーザーログインフォームのParam型 */
class UserLoginFormParam {
  /** ログインメールアドレス */
  loginEmail: string = "";
  /** ログインパスワード */
  loginPassword: string = "";
}

/** ユーザーサインアップフォームのParam型 */
class UserSignUpFormParam {
  /** サインアップメールアドレス */
  signupEmail: string = "";
  /** サインアップパスワード */
  signupPassword: string = "";
  /** 確認用サインアップパスワード */
  confirmSignupPassword = "";
}

/** ユーザーログイン画面のParam型 */
export class UserAuthFormParam
  implements UserLoginFormParam, UserSignUpFormParam {
  /** ログインメールアドレス */
  loginEmail: string = "";
  /** ログインパスワード */
  loginPassword: string = "";
  /** サインアップメールアドレス */
  signupEmail: string = "";
  /** サインアップパスワード */
  signupPassword: string = "";
  /** 確認用サインアップパスワード */
  confirmSignupPassword = "";
}
