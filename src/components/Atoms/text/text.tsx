import React from "react";
import styled from "styled-components";

interface Props {
  /** テキスト */
  text: string;
  /** クラスネーム */
  className?: string;
  /** テキストタイプ */
  type?: "headline" | undefined;
}

const TextPresenter: React.FC<Props> = ({ children, ...props }) => {
  return <span className={props.className}>{props.text}</span>;
};

export const Text = styled(TextPresenter)<Props>`
  &&&&& {
    font-size: ${(props) => {
      if (props.type === "headline") {
        return "1.2rem";
      }
    }};
  }
`;
