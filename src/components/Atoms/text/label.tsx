import React from "react";
import styled from "styled-components";

interface Props {
  /** ラベル名 */
  label: string;
  /** フォントサイズ */
  fontSize?: "small" | "medium" | "large";
  /** 太字 */
  bold?: boolean;
  /** クラスネーム */
  className?: string;
}

const LabelPresenter = (props: Props) => {
  return (
    <>
      <label className={props.className}>{props.label}</label>
    </>
  );
};

export const Label = styled(LabelPresenter)<Props>`
  &&&&& {
    width: 100%;
    ${(props) => (props.bold ? "font-weight: bold;" : "")}
    ${(props) => (props.fontSize === "large" ? "font-size: 1.2rem;" : "")}
    ${(props) => (props.fontSize === "small" ? "font-size: 0.8rem;" : "")}
  }
`;
