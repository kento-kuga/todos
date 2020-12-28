import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Row } from "../atoms/layout";

interface Props {
  /** クラスネーム */
  className?: string;
}

const TasksHeaderPresenter = (props: Props) => {
  return (
    <header className={props.className}>
      <Grid>
        <Row className="header-row">
          <Link to="/folders">＜リストへ</Link>
        </Row>
      </Grid>
    </header>
  );
};

export const TasksHeader = styled(TasksHeaderPresenter)`
  &&&&& {
    height: 8vh;
    //ヘッダー行
    .header-row {
      padding-bottom: 0;
    }
  }
`;
