import React from "react";
import * as UI from "semantic-ui-react";
import styled from "styled-components";
import { ButtonColor, ButtonSize } from "../../../common/consts/ui-value-type";

interface Props {
  /** ラベル */
  label: string;
  /** クリック時ハンドラ */
  onClick?: () => void;
  /** カラー */
  color: ButtonColor;
  /** サイズ */
  size?: ButtonSize;
  /** クラスネーム */
  className?: string;
  /** key? */
  key?: any;
  /** 選択 */
  selected?: boolean;
  /** テストid */
  testid?: string;
}

const ButtonPresenter: React.FC<Props> = ({ children, ...props }) => {
  //function
  //クリック時ハンドラ
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <>
      <UI.Button
        onClick={handleClick}
        color={props.color}
        size={props.size}
        basic
        className={props.className}
        key={props.key}
        data-testid={props.testid}
      >
        {props.label}
      </UI.Button>
    </>
  );
};

export const Button = styled(ButtonPresenter)<Props>`
  &&&&& {
    white-space: nowrap;
  }
`;
