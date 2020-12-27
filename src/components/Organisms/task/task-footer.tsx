import React from "react";
import styled from "styled-components";
import { useTasksHandler } from "../../../common/hooks/tasks/useTasksHandler";
import { Grid, Row } from "../../Atoms/layout";
import { AddTaskForm } from "../form/add-task-form";

interface Props {
  /** クラスネーム */
  className?: string;
}

const TasksFooterPresenter = (props: Props) => {
  //function
  //タスクリストハンドラー
  const { handleAddTask } = useTasksHandler();

  return (
    <footer className={props.className}>
      <Grid>
        <Row textAlign="center">
          <AddTaskForm handleSubmit={handleAddTask} />
        </Row>
      </Grid>
    </footer>
  );
};

export const TasksFooter = styled(TasksFooterPresenter)``;
