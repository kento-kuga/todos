import React from "react";
import styled from "styled-components";

interface Props {
  /** ラベル */
  label?: string;
  /** 画像名 */
  imageName?: string;
  /** クラスネーム */
  className?: string;
}

const LogoPresenter = (props: Props) => {
  return (
    <div className={props.className}>
      {props.label && <span className="label">{props.label}</span>}
    </div>
  );
};

export const Logo = styled(LogoPresenter)`
  &&&&& {
    font-size: 2.5rem;
    .label {
      padding: 0.1rem 0.5rem;
    }
  }
`;
