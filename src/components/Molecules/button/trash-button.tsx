import React from "react";
import { IconSize } from "../../../common/consts/ui-value-type";
import { Icon } from "../../atoms/icon";

interface Props {
  /** 無効 */
  isDisable?: boolean;
  /** クリック時ハンドラ */
  handleClick: () => void;
  /** 大きさ(default：large) */
  size?: IconSize;
}

export const TrashButton = (props: Props) => {
  return (
    <Icon
      iconName="trash"
      size={props.size ? props.size : "large"}
      disable={props.isDisable}
      onClick={props.handleClick}
    />
  );
};
