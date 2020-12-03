import React from "react";
import * as UI from "semantic-ui-react";
import {
  IconColor,
  IconCorner,
  IconName,
  IconSize,
} from "../../../common/consts/ui-value-type";

interface Props {
  /** アイコン名 */
  iconName: IconName;
  /** クラス */
  className?: string;
  /** onCLick */
  onClick?: () => void;
  /** サイズ */
  size?: IconSize;
  /** 非活性フラグ */
  disable?: boolean;
  /** 反転 */
  inverted?: boolean;
  /** 色 */
  color?: IconColor;
  /** コーナー位置 */
  corner?: IconCorner;
  /** 角丸 */
  circular?: boolean;
  /** テストid */
  testid?: string;
}
export type IconProps = Props;

export const Icon = (props: Props) => {
  //クリックハンドラ
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <UI.Icon
      className={props.className}
      name={props.iconName}
      onClick={onClick}
      size={props.size}
      disabled={props.disable}
      inverted={props.inverted}
      color={props.color}
      corner={props.corner}
      circular={props.circular}
      data-testid={props.testid}
    />
  );
};
