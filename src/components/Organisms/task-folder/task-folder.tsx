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
}

const TaskFolderPresenter = (props: Props) => {
  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={4} className="task-folder-row">
          <Column width={1} className="task-folder-column">
            <Icon iconName="folder outline" size="large" />
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
