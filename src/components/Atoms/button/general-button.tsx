import React from "react";
import styled from "styled-components";
import { Button } from "./button";

interface Props {
  /** ラベル */
  label: string;
  /** クリック時ハンドラ */
  onClick?: () => void;
  /** クラスネーム */
  className?: string;
  /** 選択 */
  selected?: boolean;
}

const GeneralButtonPresenter = (props: Props) => {
  return (
    <>
      <Button
        label={props.label}
        color="blue"
        size="mini"
        onClick={props.onClick}
        className={props.className}
        selected={props.selected}
      />
    </>
  );
};

//style
export const GeneralButton: typeof GeneralButtonPresenter = styled(
  GeneralButtonPresenter
)``;
