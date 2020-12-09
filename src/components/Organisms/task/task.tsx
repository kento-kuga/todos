import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../../common/dto/task";
import { Column, Grid, Row } from "../../Atoms/layout";
import { Segment } from "../../Atoms/segment";
import { CheckBox } from "../../Molecules/check-box";

interface Props {
  /** タスク情報 */
  task: TaskInfo;
  /** クラスネーム */
  className?: string;
}

const TaskPresenter = (props: Props) => {
  //state
  //タスク選択フラグ
  const [selected, setSelected] = React.useState(false);

  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={2}>
          <Column width={1}>
            <CheckBox selected={selected} />
          </Column>
          <Column width={10}>{props.task.name}</Column>
        </Row>
      </Grid>
    </Segment>
  );
};

export const Task = styled(TaskPresenter)`
  &&&&& {
    font-size: 1.1rem;
    border: 1px solid;
  }
`;
