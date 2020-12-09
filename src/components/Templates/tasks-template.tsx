import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { TaskFolderInfo } from "../../common/dto/taskFolder";
import { Grid, Row } from "../Atoms/layout";
import { TasksHeader } from "../Organisms/header/tasks-header";
import { TaskList } from "../Organisms/task/task-list";

interface Props {
  /** タスクフォルダー情報 */
  taskFolder: TaskFolderInfo;
  /** タスクリスト */
  tasks: TaskInfo[];
  /** クラスネーム */
  className?: string;
}

const TasksTemplatePresenter = (props: Props) => {
  return (
    <div className={props.className}>
      <header className="tasks-header">
        <TasksHeader folderName={props.taskFolder.folderName} />
      </header>
      <main className="tasks-main">
        <Grid container>
          <Row>
            <TaskList tasks={props.tasks} />
          </Row>
        </Grid>
      </main>
      <footer>j</footer>
    </div>
  );
};

export const TasksTemplate = styled(TasksTemplatePresenter)`
  &&&&& {
    .tasks-header {
      margin-bottom: 1.5rem;
    }
  }
`;
