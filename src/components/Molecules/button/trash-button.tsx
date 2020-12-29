import React from "react";
import { Icon } from "../../atoms/icon";

interface Props {
  /** 無効 */
  isDisable: boolean;
  /** クリック時ハンドラ */
  handleClick: () => void;
}

export const TrashButton = (props: Props) => {
  return (
    <Icon
      iconName="trash"
      size="big"
      disable={props.isDisable}
      onClick={props.handleClick}
    />
  );
};
