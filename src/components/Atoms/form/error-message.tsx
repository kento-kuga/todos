import React from "react";
import { DeepMap, FieldError } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";

interface Props {
  /** 属性名 */
  name: string;
  /** エラー */
  errors: DeepMap<Record<string, any>, FieldError>;
  /** クラスネーム */
  className?: string;
  /** 赤色フォント */
  redFont?: boolean;
}
const ErrorMessageDivPresenter = (props: Props) => {
  return (
    <div className={props.className}>
      <ErrorMessage errors={props.errors} name={props.name} />
    </div>
  );
};

export const ErrorMessageDiv = styled(ErrorMessageDivPresenter)`
  &&&&& {
    ${(props) => (props.redFont ? "color:red;" : "")}
  }
`;
