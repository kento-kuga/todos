/** ランダム文字列生成関数 */
export const createRandomString = (length?: number) => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = length || 20;

  const string = Array.from(Array(N))
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join("");

  return string;
};
