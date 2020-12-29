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
}

const EditAndFixedButtonPresenter = (props: Props) => {
  return (
    <>
      {!props.isEdit && (
        <Icon
          iconName="edit outline"
          onClick={props.handleClickEditButton}
          className="edit-button"
          size="large"
        />
      )}
      {props.isEdit && (
        <Icon
          iconName="check circle outline"
          onClick={props.handleClickFixedButton}
          color="blue"
          className="fixed-button"
        />
      )}
    </>
  );
};

export const EditAndFixedButton = styled(EditAndFixedButtonPresenter)`
  &&&&& {
    //編集ボタン
    .edit-button {
      font-size: 1.2em;
    }
    //確定ボタン
    .fixed-button {
      font-size: 1.3em;
      padding-top: 0.2rem;
    }
  }
`;
