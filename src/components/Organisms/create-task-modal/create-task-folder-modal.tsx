import React from "react";
import styled from "styled-components";
import { Grid, Row } from "../../Atoms/layout";
import { Modal, ModalContent } from "../../Atoms/modal";
import { CreateTaskFolderForm } from "../Form/create-task-folder-form";

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
  //function
  //ファルダー作成時ハンドラー
  const handleCreateFolder = (createFolderName: string) => {
    //フォルダー作成
    props.handleCreateFolder(createFolderName);
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
            <CreateTaskFolderForm handleSubmit={handleCreateFolder} />
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
