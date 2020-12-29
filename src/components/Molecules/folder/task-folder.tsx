import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { TaskFolderInfo } from "../../../common/dto/task-folder";
import { useToggle } from "../../../common/hooks/common/toggle-hook";
import { Icon } from "../../atoms/icon";
import { Column, Grid, Row } from "../../atoms/layout";
import { Segment } from "../../atoms/segment";

interface Props {
  //タスクフォルダー情報
  taskFolderInfo: TaskFolderInfo;
  /** 編集モード */
  editMode: boolean;
  /** ファルダークリック時ハンドラ */
  handleClickFolder: () => void;
  /** クラスネーム */
  className?: string;
}

const TaskFolderPresenter = React.memo((props: Props) => {
  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={4} className="task-folder-row">
          <Column
            width={1}
            className="task-folder-column"
            onClick={props.handleClickFolder}
          >
            <Icon iconName="folder outline" size="large" />
          </Column>
          <Column
            width={12}
            className="task-folder-column"
            onClick={props.handleClickFolder}
          >
            {props.taskFolderInfo.folderName}
          </Column>
          <Column
            width={1}
            className="task-folder-column task-folder-tasks-column"
          >
            {props.taskFolderInfo.taskNumber}
          </Column>
          <Column width={1} className="task-folder-column">
            <Icon iconName="group" size="large" />
          </Column>
        </Row>
      </Grid>
    </Segment>
  );
});

export const TaskFolder = styled(TaskFolderPresenter)`
  &&&&& {
    font-size: 1.3rem;
    border: 1px solid;
    //タスクフォルダー行
    .task-folder-row {
      display: table;
      //タスクフォルダー列
      .task-folder-column {
        display: table-cell;
        vertical-align: middle;
        //フォルダー選択チェックボックス
        .folder-select-check-box {
          padding: 0.3rem;
        }
      }
    }
  }
`;
