import React from "react";
import styled from "styled-components";
import { TasksHeader } from "../organisms/tasks-header";
import { TaskMain } from "../organisms/tasks-main";
import { TasksFooter } from "../organisms/tasks-footer";

interface Props {
  /** クラスネーム */
  className?: string;
}

const TasksTemplatePresenter = (props: Props) => {
  return (
    <div className={props.className}>
      <TasksHeader className="tasks-header" />
      <TaskMain className="tasks-main" />
      <TasksFooter className="tasks-footer" />
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
