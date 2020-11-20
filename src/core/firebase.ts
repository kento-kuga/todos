import firebase from "firebase";
const env = process.env;
export default class Firebase {
  private static _instance: Firebase;
  private _db: firebase.firestore.Firestore;
  private _auth: firebase.auth.Auth;

  private constructor() {
    firebase.initializeApp({
      apiKey: env.REACT_APP_API_KEY,
      authDomain: env.REACT_APP_AUTH_DOMAIN,
      databaseURL: env.REACT_APP_DATABASE_URL,
      projectId: env.REACT_APP_PROJECT_ID,
      storageBucket: env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
      appId: env.REACT_APP_APP_ID,
      measurementId: env.REACT_APP_MEASUREMENT_ID,
    });

    this._db = firebase.firestore();
    this._auth = firebase.auth();
  }

  public static get instance(): Firebase {
    if (!this._instance) {
      this._instance = new Firebase();
    }
    return this._instance;
  }

  public get db() {
    if (this._db) {
      return this._db;
    } else {
      this._db = firebase.firestore();
      return this._db;
    }
  }

  public get auth() {
    if (this._auth) {
      return this._auth;
    } else {
      this._auth = firebase.auth();
      return this._auth;
    }
  }
}
