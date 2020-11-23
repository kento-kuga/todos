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
      {props.label && <span>{props.label}</span>}
    </div>
  );
};

export const Logo = styled(LogoPresenter)`
  &&&&& {
  }
`;
