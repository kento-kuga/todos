import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";

interface Props {
  /** タスクリスト */
  tasks: TaskInfo[];
}

const TasksTemplatePresenter = (props: Props) => {
  return <>{props.tasks.map((task, i) => task.name)}</>;
};

export const TasksTemplate = styled(TasksTemplatePresenter)``;
