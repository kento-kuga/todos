import React from "react";
import styled from "styled-components";
import { Icon } from "../atoms/icon";

interface Props {
  /** 選択 */
  selected: boolean;
  /** クラスネーム */
  className?: string;
}

const CheckBoxPresenter = (props: Props) => {
  return (
    <>
      {!props.selected && (
        <div className={props.className}>
          <Icon iconName="square outline" />
        </div>
      )}
      {props.selected && (
        <div className={props.className}>
          <Icon iconName="check square outline" />
        </div>
      )}
    </>
  );
};

export const CheckBox = styled(CheckBoxPresenter)``;
