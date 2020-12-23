import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { Task } from "./task";

interface Props {
  /** タスクリスト */
  tasks: TaskInfo[];
  //タスク完了状態変更時ハンドラ-
  handleChangeTaskCompleted: (task: TaskInfo, completed: boolean) => void;
}

const TaskListPresenter = React.memo((props: Props) => {
  return (
    <>
      {props.tasks.map((task, i) => (
        <Task
          task={task}
          handleChangeTaskCompleted={props.handleChangeTaskCompleted}
          key={i}
        />
      ))}
    </>
  );
});

export const TaskList = styled(TaskListPresenter)``;
