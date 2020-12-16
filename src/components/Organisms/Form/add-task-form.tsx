import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { TasksFormParams } from "../../../common/dto/task";
import { Form, Input } from "../../Atoms/form";

interface Props {
  /** 送信ハンドラー */
  handleSubmit: (createTaskName: string) => void;
  /** クラスネーム */
  className?: string;
}

const AddTaskFormPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { control, handleSubmit, reset } = useFormContext<TasksFormParams>();

  //function
  //送信ハンドラー
  const onSubmit = (data: TasksFormParams) => {
    props.handleSubmit(data.createTaskName);
    //フォーム初期化
    reset({ createTaskName: "" });
  };

  return (
    <div className={props.className}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="createTaskName"
          control={control}
          fluid
          rules={{
            required: true,
          }}
          className="add-task-input"
        />
      </Form>
    </div>
  );
};

export const AddTaskForm = styled(AddTaskFormPresenter)`
  &&&&& {
    .add-task-input {
      font-size: 16px;
    }
  }
`;
