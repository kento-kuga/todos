import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { FoldersFormParams } from "../../../common/dto/task-folder";
import { PrimaryButton } from "../../atoms/button";
import { Grid, Row } from "../../atoms/layout";
import { Modal, ModalContent } from "../../atoms/modal";
import { CreateTaskFolderForm } from "../form/create-task-folder-form";

interface Props {
  /** オープンフラグ */
  open: boolean;
  /** クローズハンドラ */
  handleClose: () => void;
  /** フォルダー作成時ハンドラー */
  handleCreateFolder: (createFolderName: string) => void;
  /** クラスネーム */
  className?: string;
}

const CreateTaskFolderModalPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { handleSubmit } = useFormContext();

  //function
  //ファルダー作成時ハンドラー
  const handleCreateFolder = (data: FoldersFormParams) => {
    //フォルダー作成
    props.handleCreateFolder(data.createFolderName);
    //モーダルを閉じる
    if (props.handleClose) {
      props.handleClose();
    }
  };

  return (
    <Modal
      onClose={props.handleClose}
      open={props.open}
      className={props.className}
      noCloseOnDimmerClick
      testid="create-task-folder-modal"
    >
      <ModalContent className="modal-content">
        <Grid>
          <Row>
            <CreateTaskFolderForm handleCreateFolder={handleCreateFolder} />
          </Row>
          <Row textAlign="right">
            <PrimaryButton
              label="OK"
              onClick={handleSubmit(handleCreateFolder)}
            />
          </Row>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export const CreateTaskFolderModal = styled(CreateTaskFolderModalPresenter)`
  &&&&& {
    .modal-content {
      padding: 3rem 3rem !important;
    }
  }
`;
