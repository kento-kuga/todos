import React from "react";
import styled from "styled-components";
import { useHeaderLabel } from "../../../common/hooks/useHeaderLabel";
import { Grid, Row } from "../../Atoms/layout";

interface Props {
  /** クラスネーム */
  className?: string;
}

const AppHeaderPresenter = (props: Props) => {
  //hooks
  const [headerLabel] = useHeaderLabel();

  return (
    <Grid className={props.className}>
      <Row className="header-row">
        <div className="header-content">{headerLabel}</div>
      </Row>
    </Grid>
  );
};

export const AppHeader = styled(AppHeaderPresenter)`
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
