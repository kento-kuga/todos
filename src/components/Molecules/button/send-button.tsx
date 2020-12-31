import React from "react";
import { Icon } from "../../atoms/icon";

interface Props {
  /** クリック時ハンドラ */
  handleClick: () => void;
  /** 非活性フラグ */
  disable?: boolean;
}

export const SendButton = (props: Props) => {
  return (
    <>
      <Icon
        iconName="send"
        size="large"
        onClick={props.handleClick}
        disable={props.disable}
        color="blue"
      />
    </>
  );
};
