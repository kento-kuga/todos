import { UserInfo } from "../../common/dto/user";
import { Listener } from "../../core/listener";

export interface UserRepositoryInterface {
  /**
   * ユーザー情報取得
   * @param userId ユーザーID
   * @param listener リスナー
   * @return userInfo ユーザー情報
   */
  getByUserId: (
    userId: string | undefined,
    listener: Listener
  ) => Promise<UserInfo | null>;
}
