import React from "react";
import * as UI from "semantic-ui-react";
import { IconSize } from "../../../common/consts/ui-value-type";

interface Props {
  /** サイズ */
  size?: IconSize;
  /** as */
  as?: string;
  /** クラスネーム */
  className?: string;
}

export const IconGroup: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <UI.IconGroup size={props.size} className={props.className} as={props.as}>
        {children}
      </UI.IconGroup>
    </>
  );
};
