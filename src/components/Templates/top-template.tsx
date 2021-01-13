import React from "react";
import styled from "styled-components";
import { Grid, Row } from "../atoms/layout";
import { Logo } from "../atoms/logo";
import { AuthContainer } from "../organisms/auth-container";

interface Props {
  /** クラスネーム */
  className?: string;
}

const TopTemplatePresenter = (props: Props) => {
  return (
    <div className={props.className}>
      <Grid>
        <Row textAlign="center">
          <Logo label="ToDos" className="logo" />
        </Row>
        <Row>
          <AuthContainer />
        </Row>
      </Grid>
    </div>
  );
};

export const TopTemplate = styled(TopTemplatePresenter)`
  &&&&& {
    .logo {
      margin-top: 2rem;
    }
  }
`;
