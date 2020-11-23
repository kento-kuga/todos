import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Row } from "../Atoms/layout";

interface Props {
  /** クラスネーム */
  className?: string;
}

const TopTemplatePresenter = (props: Props) => {
  return (
    <div className={props.className}>
      <Grid>
        <Row>トップページ</Row>
        <Row>
          <Link to="/folders">フォルダー一覧</Link>
        </Row>
      </Grid>
    </div>
  );
};

export const TopTemplate = styled(TopTemplatePresenter)``;
