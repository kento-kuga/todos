import React from "react";
import styled from "styled-components";
import { Grid, Row } from "../../Atoms/layout";
import { Modal, ModalContent } from "../../Atoms/modal";
import { CreateTaskFolderForm } from "../Form/create-task-folder-form";

interface Props {
  /** オープンフラグ */
  open: boolean;
  /** トリガー */
  getTrigger?: () => React.ReactNode;
  /** オープンハンドラ */
  onOpen?: () => void;
  /** クローズハンドラ */
  onClose?: () => void;
  /** クラスネーム */
  className?: string;
  /** フォルダー作成時ハンドラー */
  handleCreateFolder: (folderName: string) => void;
}

const CreateTaskFolderModalPresenter = (props: Props) => {
  //function
  //ファルダー作成時ハンドラー
  const handleCreateFolder = (folderName: string) => {
    //フォルダー作成
    props.handleCreateFolder(folderName);
    //モーダルを閉じる
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <Modal
      onClose={props.onClose}
      onOpen={props.onOpen}
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
