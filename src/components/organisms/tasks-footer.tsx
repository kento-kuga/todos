import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { TasksFormParams } from "../../common/dto/task";
import { useTasksHandler } from "../../common/hooks/tasks/tasks-handler-hook";
import { Form } from "../atoms/form";
import { Column, Grid, Row } from "../atoms/layout";
import { SendButton } from "../molecules/button/send-button";
import { AddTaskInput } from "../molecules/form/add-task-input";

interface Props {
  /** クラスネーム */
  className?: string;
}

const TasksFooterPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { handleSubmit, watch, reset } = useFormContext<TasksFormParams>();

  //入力中タスク
  const currentCreateTaskName = watch("createTaskName");

  //function
  //タスクリストハンドラー
  const { handleAddTask } = useTasksHandler();

  //function
  //送信ハンドラー
  const onSubmit = (data: TasksFormParams) => {
    //画面を上にスクロール
    window.scrollTo(0, 0);
    //タスク追加
    handleAddTask(data.createTaskName);
    //フォーム初期化
    reset({ createTaskName: "" });
  };

  return (
    <footer className={props.className}>
      <Grid>
        <Row className="add-task-row">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <AddTaskInput className="add-task-form" />
          </Form>
        </Row>
        <Row className="option-row" columns={1}>
          <Column className="option-column">
            <div className="option-block"></div>
            <div className="add-task-button-block">
              <SendButton
                handleClick={handleSubmit(onSubmit)}
                disable={currentCreateTaskName ? false : true}
              />
            </div>
          </Column>
        </Row>
      </Grid>
    </footer>
  );
};

export const TasksFooter = styled(TasksFooterPresenter)`
  &&&&& {
    background-color: white;
    //タスク追加行
    .add-task-row {
      padding-bottom: 0rem;
      //タスク追加フォーム
      .add-task-form {
        margin: auto;
        width: 95%;
      }
    }
    //タスク追加オプション行
    .option-row {
      padding-top: 0.5rem;
      //タスク追加カラム
      .option-column {
        display: flex;
        //オプション
        .option-block {
          margin-right: auto;
        }
        //タスク追加ボタン
        .add-task-button-block {
          padding-right: 0.8rem;
        }
      }
    }
  }
`;
