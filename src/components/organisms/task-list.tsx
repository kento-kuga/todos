import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { useTasksHandler } from "../../common/hooks/tasks/tasks-handler-hook";
import { Task } from "../molecules/task";

interface Props {
  /** タスクリスト */
  tasks: TaskInfo[];
  /** クラスネーム */
  className?: string;
}

const TaskListPresenter = React.memo((props: Props) => {
  //function
  //タスクリストハンドラー
  const { handleChangeTaskCompleted } = useTasksHandler();

  return (
    <>
      {props.tasks.map((task, i) => (
        <Task
          task={task}
          handleChangeTaskCompleted={handleChangeTaskCompleted}
          key={i}
          className={props.className}
        />
      ))}
    </>
  );
});

export const TaskList = styled(TaskListPresenter)`
  &&&&& {
    margin: 0.3rem 0;
  }
`;
