import React from "react";
import * as UI from "semantic-ui-react";

interface Props {
  /** クラスネーム */
  className?: string;
  /** 送信ハンドラ */
  onSubmit?: any;
}

export const Form: React.FC<Props> = ({ children, ...props }) => {
  return (
    <UI.Form onSubmit={props.onSubmit} className={props.className}>
      {children}
    </UI.Form>
  );
};
