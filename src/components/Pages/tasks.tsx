import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TasksFormParams } from "../../common/dto/task";
import { TasksTemplate } from "../templates/tasks-template";

interface Props {}

export const Tasks = (props: Props) => {
  //フォームパーツ
  const methods = useForm<TasksFormParams>();

  return (
    <FormProvider {...methods}>
      <TasksTemplate />
    </FormProvider>
  );
};
