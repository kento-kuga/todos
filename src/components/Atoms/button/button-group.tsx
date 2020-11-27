import React from "react";
import * as UI from "semantic-ui-react";

interface Props {
  /** クラスネーム */
  className?: string;
}

export const ButtonGroup: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <UI.ButtonGroup className={props.className}>{children}</UI.ButtonGroup>
    </>
  );
};
