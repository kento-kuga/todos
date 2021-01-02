/** システムエラー */
export class SystemError extends Error {}

/** すでにユーザーが登録されているエラー */
export class ExistingRegistrationError extends Error {}

/** email、パスワードが間違っているエラー */
export class WrongEmailOrPassword extends Error {}
