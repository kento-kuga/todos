import { CreateUserReq, LoginReq } from "../../common/dto/user";
import { Listener } from "../../core/listener";

export interface AuthRepositoryInterface {
  /**
   * ユーザー作成
   * @param req ユーザー作成リクエスト
   * @param listener リスナー
   */
  create: (req: CreateUserReq, listener: Listener) => void;

  /**
   * ログイン
   * @param req ログインリクエスト
   * @param listener リスナー
   */
  login: (req: LoginReq, listener: Listener) => void;

  /** ログアウト */
  logout: () => void;
}
