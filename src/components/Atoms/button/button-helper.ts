

interface Item {
  /** ラベル */
  label?: string;
  /** 値 */
  value?: any
  /** クラスネーム */
  className?: string;
    /** 選択 */
  selected?: boolean;
}
/** 汎用ボタンアイテム */
export type ButtonItem = Item;
