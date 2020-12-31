import React from "react";
import styled from "styled-components";
import { Icon } from "../../atoms/icon";

interface Props {
  /** クリック時ハンドラ */
  handleClick: () => void;
  /** ラベル */
  label?: string;
  /** クラスネーム */
  className?: string;
}

const BackButtonPresenter = (props: Props) => {
  return (
    <div onClick={props.handleClick} className={props.className}>
      <div>
        <Icon iconName="chevron left" size="large" color="blue" />
      </div>
      {props.label && <div className="label">{props.label}</div>}
    </div>
  );
};

export const BackButton = styled(BackButtonPresenter)`
  &&&&& {
    display: flex;
    .label {
      padding-top: 0.15rem;
      font-size: 1.2rem;
      color: #2185d0;
    }
  }
`;
