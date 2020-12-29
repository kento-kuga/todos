import React from "react";
import styled from "styled-components";
import { Icon } from "../../atoms/icon";

interface Props {
  /** 編集中 */
  isEdit: boolean;
  /** 編集ボタン押下時ハンドラ */
  handleClickEditButton: () => void;
  /** 確定ボタン押下時ハンドラ */
  handleClickFixedButton: () => void;
  /** クラスネーム */
  className?: string;
}

const EditAndFixedButtonPresenter = (props: Props) => {
  return (
    <>
      {!props.isEdit && (
        <Icon
          iconName="edit outline"
          onClick={props.handleClickEditButton}
          className={props.className}
          size="large"
        />
      )}
      {props.isEdit && (
        <Icon
          iconName="check circle outline"
          onClick={props.handleClickFixedButton}
          color="blue"
          className={props.className}
        />
      )}
    </>
  );
};

export const EditAndFixedButton = styled(EditAndFixedButtonPresenter)<Props>`
  &&&&& {
    ${(props) => {
      if (props.isEdit) {
        //確定ボタン
        return `
          font-size: 1.3em;
          padding-top: 0.2rem;
        `;
      } else {
        //編集ボタン
        return `
          font-size: 1.2em;
        `;
      }
    }}
  }
`;
