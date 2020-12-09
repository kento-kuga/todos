import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { TaskFolderInfo } from "../../common/dto/taskFolder";
import { Grid, Row } from "../Atoms/layout";
import { TaskList } from "../Organisms/task/task-list";

interface Props {
  /**　タスクフォルダー情報 */
  taskFolder: TaskFolderInfo;
  /** タスクリスト */
  tasks: TaskInfo[];
}

const TasksTemplatePresenter = (props: Props) => {
  return (
    <Grid>
      <Row>{props.taskFolder.folderName}</Row>
      <Row>
        <TaskList tasks={props.tasks} />
      </Row>
    </Grid>
  );
};

export const TasksTemplate = styled(TasksTemplatePresenter)``;
