import firebase from "firebase";
import Firebase from "../core/firebase";
import { UserInfo } from "../common/dto/user";
import { SystemError } from "../core/error";
import { Listener } from "../core/listener";
import { COLLECTION_NAME_USERS } from "./repository-helper";
import { UserRepositoryInterface } from "./interfaces/user-interface";
export class UserRepository implements UserRepositoryInterface {
  //dbインスタンス
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = Firebase.instance.db;
  }

  /** ユーザー取得 */
  getByUserId = async (userId: string | undefined, listener: Listener) => {
    //ユーザー情報がなければ何もしない
    if (!userId) return null;

    try {
      listener.started();

      //ユーザー取得
      const doc = await this._db
        .collection(COLLECTION_NAME_USERS)
        .doc(userId)
        .get();
      const data = await doc.data();

      return { ...data, userId: doc.id } as UserInfo;
    } catch (e) {
      console.error(e);
      throw new SystemError();
    } finally {
      listener.finished();
    }
  };
}
