/**
 * リスナー。
 */
export interface Listener {
  /**
   * API開始前に呼び出される。
   */
  started: () => void;

  /**
   * API終了後に(エラー有無にかかわらず)呼び出される。
   */
  finished: () => void;
}
