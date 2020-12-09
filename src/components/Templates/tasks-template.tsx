import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { TaskFolderInfo } from "../../common/dto/taskFolder";
import { Icon } from "../Atoms/icon";
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
      <footer className="tasks-footer">
        <Grid>
          <Row textAlign="center">
            <Icon iconName="add" circular size="large" color="blue" />
          </Row>
        </Grid>
      </footer>
    </div>
  );
};

export const TasksTemplate = styled(TasksTemplatePresenter)`
  &&&&& {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    overflow-x: hidden;

    .tasks-header {
      margin-bottom: 1.5rem;
    }
    .tasks-main {
      flex: 1;
    }
    .tasks-footer {
      padding-bottom: calc(env(safe-area-inset-bottom) + 40px);
    }
  }
`;
