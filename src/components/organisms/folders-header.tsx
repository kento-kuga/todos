import React from "react";
import styled from "styled-components";
import { useAuthHandler } from "../../common/hooks/common/auth-handler-hook";
import { Column, Grid, Row } from "../atoms/layout";

interface Props {
  /** クラスネーム */
  className?: string;
}

const FoldersHeaderPresenter = (props: Props) => {
  //function
  const { handleLogout } = useAuthHandler();

  return (
    <header className={props.className}>
      <Grid>
        <Row className="header-row" columns={1}>
          <Column className="header-column">
            <div className="header-title">Folders</div>
            <div onClick={handleLogout} className="logout-button">
              log out
            </div>
          </Column>
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
      //ヘッダーカラム
      .header-column {
        display: flex;
        //タイトル
        padding-top: 4vh;
        .header-title {
          margin-right: auto;
          padding-left: 1.5rem;
          font-size: 2rem;
          font-weight: 600;
        }
        //ログアウトボタン
        .logout-button {
          padding-right: 1.4rem;
          font-size: 1.3rem;
        }
      }
    }
  }
`;
