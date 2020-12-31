import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { TasksFormParams } from "../../../common/dto/task";
import { Input } from "../../atoms/form";

interface Props {
  /** クラスネーム */
  className?: string;
}

const AddTaskInputPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { control } = useFormContext<TasksFormParams>();

  return (
    <div className={props.className}>
      <Input
        name="createTaskName"
        control={control}
        fluid
        rules={{
          required: true,
        }}
        placeholder="add task"
        className="add-task-input"
      />
    </div>
  );
};

export const AddTaskInput = styled(AddTaskInputPresenter)`
  &&&&& {
    .add-task-input {
      font-size: 16px;
      overflow-wrap: break-word;
      input {
        background-color: #f1f1f1;
        border: none;
      }
    }
  }
`;
