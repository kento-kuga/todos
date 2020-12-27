import { UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import Firebase from "../core/firebase";
import { Listener } from "../core/listener";
import { COLLECTION_NAME_USERS } from "./repository-helper";

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

    const doc = await db.collection(COLLECTION_NAME_USERS).doc(userId).get();
    const data = await doc.data();

    return { ...data, userId: doc.id } as UserInfo;
  } catch (e) {
    console.error(e);
    throw new SystemError();
  } finally {
    listener.finished();
  }
};
