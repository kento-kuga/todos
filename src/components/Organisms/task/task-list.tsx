import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../../common/dto/task";
import { Task } from "./task";

interface Props {
  /** タスクリスト */
  tasks: TaskInfo[];
}

const TaskListPresenter = (props: Props) => {
  return (
    <>
      {props.tasks.map((task, i) => (
        <Task task={task} key={i} />
      ))}
    </>
  );
};

export const TaskList = styled(TaskListPresenter)``;
