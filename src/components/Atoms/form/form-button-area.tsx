import React from "react";
import styled from "styled-components";
import { TextAlign } from "../../../common/consts/ui-value-type";

interface Props {
  /** 揃え向き */
  textAlign?: TextAlign;
  /** クラスネーム */
  className?: string;
}

const FormButtonAreaPresenter: React.FC<Props> = ({ children, ...props }) => {
  return <div className={props.className}>{children}</div>;
};

export const FormButtonArea = styled(FormButtonAreaPresenter)<Props>`
  &&&&& {
    text-align: ${(props) => props.textAlign || "left"};
    padding: 1rem 0rem;
  }
`;
