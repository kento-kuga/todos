import { UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";

/**
 * ユーザー情報取得
 * @param userId ユーザーID
 * @param listener リスナー
 * @return userInfo ユーザー情報
 */
export const getUser = async (userId: string, listener: Listener) => {
  const db = Firebase.instance.db;

  try {
    listener.started();

    const doc = await db.collection("users").doc(userId).get();
    const data = await doc.data();

    return { ...data, userId: doc.id } as UserInfo;
  } catch {
    throw new SystemError();
  } finally {
    listener.finished();
  }
};
