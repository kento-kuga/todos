import React from "react";
import styled from "styled-components";
import { Grid, Row } from "../../Atoms/layout";
import { Modal, ModalContent } from "../../Atoms/modal";
import { CreateTaskForm } from "../Form/create-task-form";

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
}

const CreateTaskFolderModalPresenter = (props: Props) => {
  //state

  return (
    <Modal
      onClose={props.onClose}
      onOpen={props.onOpen}
      open={props.open}
      className={props.className}
      noCloseOnDimmerClick
    >
      <ModalContent className="modal-content">
        <Grid>
          <Row>
            <CreateTaskForm handleSubmit={props.onClose} />
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
