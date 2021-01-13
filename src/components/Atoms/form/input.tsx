import React from "react";
import { Control, Controller } from "react-hook-form";
import * as UI from "semantic-ui-react";
import styled from "styled-components";

interface Props {
  /** 属性名 */
  name: string;
  /** 初期値 */
  defaultValue?: string;
  /** コントロール */
  control: Control<Record<string, any>>;
  /** エラー */
  isError?: boolean;
  /** バリデーションルール */
  rules?: {};
  /** クラスネーム */
  className?: string;
  /** 最大文字数 */
  maxlength?: number;
  /** 幅を親要素に合わせる */
  fluid?: boolean;
  /** プレースホルダー */
  placeholder?: string;
  /** テストid */
  testid?: string;
  /** フォーカス時ハンドラ */
  handleFocus?: () => void;
  /** フォーカスアウト時ハンドラ */
  handleBlur?: () => void;
}

const InputPresenter: React.FC<Props> = ({ children, ...props }) => {
  //function
  //フォーカス時ハンドラ
  const handleFocus = React.useCallback(() => {
    if (props.handleFocus) {
      props.handleFocus();
    }
  }, [props]);
  //フォーカスアウト時ハンドラ
  const handleBlur = React.useCallback(() => {
    if (props.handleBlur) {
      props.handleBlur();
    }
  }, [props]);

  return (
    <>
      <Controller
        render={(controllerProps) => (
          <UI.Input
            name={props.name}
            maxLength={props.maxlength}
            fluid={props.fluid}
            placeholder={props.placeholder}
            data-testid={props.testid}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={controllerProps.onChange}
            className={props.className}
            value={controllerProps.value}
          />
        )}
        name={props.name}
        control={props.control}
        rules={props.rules}
        defaultValue={props.defaultValue || ""}
        onBlur={handleBlur}
      />
    </>
  );
};

//エラー時スタイル
const errorField = `
  input{
    background: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    box-shadow: none;
  }
`;

export const Input = styled(InputPresenter)<Props>`
  &&&&& {
    color: blue;
    ${(props) => (props.isError ? errorField : "")}
  }
`;
