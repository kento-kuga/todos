import React from "react";
import styled from "styled-components";
import { Grid, Row } from "../atoms/layout";

interface Props {
  /** クラスネーム */
  className?: string;
}

const FoldersHeaderPresenter = (props: Props) => {
  return (
    <header className={props.className}>
      <Grid>
        <Row className="header-row">
          <div className="header-content">Folders</div>
        </Row>
      </Grid>
    </header>
  );
};

export const FoldersHeader = styled(FoldersHeaderPresenter)`
  &&&&& {
    height: 8vh;
    //ヘッダー行
    .header-row {
      padding-bottom: 0;
      .header-content {
        padding-top: 2.5rem;
        padding-left: 2rem;
        font-size: 2rem;
        font-weight: 600;
      }
    }
  }
`;
