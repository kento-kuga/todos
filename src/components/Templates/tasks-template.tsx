import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { TaskFolderInfo } from "../../common/dto/taskFolder";
import { Grid, Row } from "../Atoms/layout";
import { AddTaskForm } from "../Organisms/form/add-task-form";
import { TasksHeader } from "../Organisms/header/tasks-header";
import { TaskList } from "../Organisms/task/task-list";

interface Props {
  /** タスクフォルダー情報 */
  taskFolder: TaskFolderInfo;
  /** タスクリスト */
  tasks: TaskInfo[];
  /** タスク追加時ハンドラ */
  handleAddTask: (createTaskName: string) => void;
  /** クラスネーム */
  className?: string;
}

const TasksTemplatePresenter = (props: Props) => {
  //hooks

  return (
    <div className={props.className}>
      <header className="tasks-header">
        <TasksHeader />
      </header>
      <main className="tasks-main">
        <Grid container>
          <Row />
          <div className="task-folder-name">{props.taskFolder.folderName}</div>
          <Row>
            <TaskList tasks={props.tasks} />
          </Row>
        </Grid>
      </main>
      <footer className="tasks-footer">
        <Grid>
          <Row textAlign="center">
            <AddTaskForm handleSubmit={props.handleAddTask} />
          </Row>
        </Grid>
      </footer>
    </div>
  );
};

export const TasksTemplate = styled(TasksTemplatePresenter)`
  &&&&& {
    min-height: 100vh;
    overflow-x: hidden;

    .tasks-header {
      position: fixed;
      top: 0;
      z-index: 1;
      height: 6vh;
      width: 100%;
      background-color: white;
    }
    .tasks-main {
      padding-top: 6vh;
      padding-bottom: 20vh;
      .task-folder-name {
        font-size: 2rem;
        font-weight: 600;
      }
    }
    .tasks-footer {
      position: fixed;
      height: 10vh;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 1;
      background-color: white;
    }
  }
`;
