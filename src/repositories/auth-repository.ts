import firebase from "firebase";
import { CreateUserReq, LoginReq } from "../common/dto/user";
import {
  ExistingRegistrationError,
  SystemError,
  WrongEmailOrPassword,
} from "../core/error";
import { Listener } from "../core/listener";
import { AuthRepositoryInterface } from "./interfaces/auth-repository-interface";
import { COLLECTION_NAME_USERS } from "./repository-helper";

export class AuthRepository implements AuthRepositoryInterface {
  /** ユーザー作成 */
  create = async (req: CreateUserReq, listener: Listener) => {
    try {
      listener.started();

      //すでに登録されているか確認する。
      const providers = await firebase
        .auth()
        .fetchSignInMethodsForEmail(req.email);
      if (
        providers.findIndex(
          (p) =>
            p === firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        ) !== -1
      ) {
        throw new ExistingRegistrationError();
      }
    } catch (e) {
      throw e;
    } finally {
      listener.finished();
    }

    //アカウントの作成
    await firebase
      .auth()
      .createUserWithEmailAndPassword(req.email, req.password);

    const currentUser = firebase.auth().currentUser;

    if (currentUser !== null) {
      //登録ができ、ユーザーが取得できた場合

      //ユーザー情報の登録
      await firebase
        .firestore()
        .collection(COLLECTION_NAME_USERS)
        .doc(currentUser.uid)
        .set({})
        .catch((error) => {
          throw error;
        });
    } else {
      //ユーザーが取得できなかった場合
      throw new Error();
    }
  };

  /** ログイン */
  login = async (req: LoginReq, listener: Listener) => {
    try {
      listener.started();

      //ログイン
      await firebase.auth().signInWithEmailAndPassword(req.email, req.password);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        throw new WrongEmailOrPassword();
      } else if (e.code === "auth/wrong-password") {
        throw new WrongEmailOrPassword();
      } else {
        throw new Error();
      }
    } finally {
      listener.finished();
    }
  };

  /** ログアウト */
  logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      throw new SystemError();
    }
  };
}
