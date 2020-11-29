import React from "react";
import { Segment } from "semantic-ui-react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../../common/dto/taskFolder";
import { Icon } from "../../Atoms/icon";
import { Column, Grid, Row } from "../../Atoms/layout";

interface Props {
  //タスクフォルダー情報
  taskFolderInfo: TaskFolderInfo;
  /** クラスネーム */
  className?: string;
  /** 編集モード */
  editMode?: boolean;
  /** 削除時ハンドラー */
  handleClickDelete?: (taskFolderId: string) => void;
}

const TaskFolderPresenter = (props: Props) => {
  //function
  //削除ボタン押下時
  const onClickTrash = () => {
    if (props.handleClickDelete) {
      props.handleClickDelete(props.taskFolderInfo.taskFolderId);
    }
  };

  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={4} className="task-folder-row">
          <Column width={1} className="task-folder-column">
            {!props.editMode && <Icon iconName="folder outline" size="large" />}
            {props.editMode && (
              <Icon iconName="trash" size="large" onClick={onClickTrash} />
            )}
          </Column>
          <Column width={12} className="task-folder-column">
            {props.taskFolderInfo.folderName}
          </Column>
          <Column width={1} className="task-folder-column">
            {props.taskFolderInfo.tasks.length}
          </Column>
          <Column width={1} className="task-folder-column">
            <div>
              <Icon iconName="group" size="large" />
            </div>
          </Column>
        </Row>
      </Grid>
    </Segment>
  );
};

export const TaskFolder = styled(TaskFolderPresenter)`
  &&&&& {
    font-size: 1.3rem;
    border: 1px solid;
    .task-folder-row {
      display: table;
      .task-folder-column {
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
`;
