import React from "react";
import * as UI from "semantic-ui-react";
import { IconSize } from "../../../common/consts/ui-value-type";

interface Props {
  /** サイズ */
  size?: IconSize;
  /** as */
  as?: string;
  /** クリック時ハンドラ */
  onClick?: () => void;
  /** クラスネーム */
  className?: string;
}

export const IconGroup: React.FC<Props> = ({ children, ...props }) => {
  //クリック時ハンドラ
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <>
      <UI.IconGroup
        size={props.size}
        className={props.className}
        as={props.as}
        onClick={handleClick}
      >
        {children}
      </UI.IconGroup>
    </>
  );
};
