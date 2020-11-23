import React from "react";
import * as UI from "semantic-ui-react";

interface Props {
  /** クラスネーム */
  className?: string;
}

export const Container: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <UI.Container className={props.className}>{children}</UI.Container>
    </>
  );
};
