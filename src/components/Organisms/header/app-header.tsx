import React from "react";
import styled from "styled-components";
import { Column, Grid, Row } from "../../Atoms/layout";
import { Logo } from "../../Atoms/logo/logo";

interface Props {
  /** クラスネーム */
  className?: string;
}

const AppHeaderPresenter = (props: Props) => {
  return (
    <Grid className={props.className}>
      <Row columns={3} className="header-row">
        <Column width={4}></Column>
        <Column width={8} className="header-center-col">
          <Logo label="Todos" className="logo" />
        </Column>
        <Column width={4}></Column>
      </Row>
    </Grid>
  );
};

export const AppHeader = styled(AppHeaderPresenter)`
  &&&&& {
    border-bottom: 1px solid;
    box-shadow:0px 1.5px 0px 0px rgba(34,36,38,.15);
    height: 10vh;
    //ヘッダー行
    .header-row {
    padding-bottom: 0;
      //ロゴ列
      .header-center-col {
        position: relative;
        height: 100%;
        //ロゴ
        .logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          -webkit- transform: translateY(-50%) translateX(-50%);
          font-size: 1.7rem;
        }
      }
    }
  }
`;
