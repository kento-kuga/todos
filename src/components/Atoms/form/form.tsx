import React from "react";
import * as UI from "semantic-ui-react";

interface Props {
  /** 送信ハンドラ */
  onSubmit?: any;
}

export const Form: React.FC<Props> = ({ children, ...props }) => {
  return <UI.Form onSubmit={props.onSubmit}>{children}</UI.Form>;
};
