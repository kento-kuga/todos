import React from "react";
import styled from "styled-components";
import { Grid, Row } from "../../Atoms/layout";

interface Props {
  /** フォルダー名 */
  folderName: string;
  /** クラスネーム */
  className?: string;
}

const TasksHeaderPresenter = (props: Props) => {
  return (
    <>
      <Grid className={props.className}>
        <Row className="header-row">
          <div className="header-content">{props.folderName}</div>
        </Row>
      </Grid>
    </>
  );
};

export const TasksHeader = styled(TasksHeaderPresenter)`
  &&&&& {
    height: 8vh;
    //ヘッダー行
    .header-row {
      padding-bottom: 0;
      .header-content {
        padding-top: 2.5rem;
        padding-left: 2rem;
        font-size: 2rem;
      }
    }
  }
`;
