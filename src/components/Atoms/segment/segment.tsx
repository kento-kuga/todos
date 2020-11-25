import React from "react";
import * as UI from "semantic-ui-react";

interface Props {
  /** クラスネーム */
  className?: string;
}

export const Segment: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <UI.Segment className={props.className}>{children}</UI.Segment>
    </>
  );
};
