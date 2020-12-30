import React from "react";
import styled, { css } from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { Column, Grid, Row } from "../atoms/layout";
import { Segment } from "../atoms/segment";
import { CheckBox } from "./check-box";

interface Props {
  /** タスク情報 */
  task: TaskInfo;
  //タスク完了状態変更時ハンドラ-
  handleChangeTaskCompleted: (task: TaskInfo, completed: boolean) => void;
  /** クラスネーム */
  className?: string;
}

const TaskPresenter = (props: Props) => {
  //function
  //チェックボックスクリック時ハンドラ
  const handleClickCheckBox = React.useCallback(() => {
    props.handleChangeTaskCompleted(props.task, !props.task.completed);
  }, [props]);

  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={2}>
          <Column width={1} className="check-box-column">
            <div className="check-box-wrapper" onClick={handleClickCheckBox}>
              <CheckBox selected={props.task.completed} />
            </div>
          </Column>
          <Column
            width={14}
            className="task-name-column"
            onClick={handleClickCheckBox}
          >
            {props.task.name}
          </Column>
        </Row>
      </Grid>
    </Segment>
  );
};

export const Task = styled(TaskPresenter)<Props>`
  &&&&& {
    //タスク全体
    font-size: 1.1rem;
    border: 0px solid;
    padding: 0.8rem 0rem;
    box-shadow: none;
    ${(props) => {
      return props.task.completed
        ? css`
            //完了済タスク
            //チェックボックス列
            .check-box-column {
              display: flex;
              align-items: center;
            }
            //タスク名列
            .task-name-column {
              overflow-wrap: break-word;
              color: #94979b;
              text-decoration: line-through;
            }
          `
        : css`
            //未完了タスク
            //チェックボックス列
            .check-box-column {
              display: flex;
              align-items: center;
            }
            //タスク名列
            .task-name-column {
              overflow-wrap: break-word;
            }
          `;
    }}
  }
`;
