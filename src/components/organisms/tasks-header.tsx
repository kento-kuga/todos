import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Grid, Row } from "../atoms/layout";
import { BackButton } from "../molecules/button/back-button";

interface Props {
  /** クラスネーム */
  className?: string;
}

const TasksHeaderPresenter = (props: Props) => {
  //hooks
  const history = useHistory();

  //function
  //戻るボタンクリック時ハンドラ
  const handleClickBack = () => {
    history.push("/folders");
  };

  return (
    <header className={props.className}>
      <Grid>
        <Row className="header-row">
          <BackButton
            label="back"
            handleClick={handleClickBack}
            className="back-button"
          />
        </Row>
      </Grid>
    </header>
  );
};

export const TasksHeader = styled(TasksHeaderPresenter)`
  &&&&& {
    height: 4vh;
    width: 100%;
    background-color: white;
    //ヘッダー行
    .header-row {
      padding-bottom: 0;
      //戻るボタン
      .back-button {
        padding-top: 0.5rem;
      }
    }
  }
`;
