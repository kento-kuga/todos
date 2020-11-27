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

const SecondaryButtonPresenter = (props: Props) => {
  return (
    <>
      <Button
        label={props.label}
        color="grey"
        size="mini"
        onClick={props.onClick}
        className={props.className}
        selected={props.selected}
      />
    </>
  );
};

/** スタイル */
const StyledSecondaryButton: typeof SecondaryButtonPresenter = styled(
  SecondaryButtonPresenter
)`` as any;

export const SecondaryButton = StyledSecondaryButton;
