import React from "react";
import styled from "styled-components";
import { useToggle } from "../../common/hooks/common/toggle-hook";
import { Grid, Row } from "../atoms/layout";
import { LoginSegment } from "./login-segment";
import { SignupSegment } from "./signup-segment";

interface Props {
  /** クラスネーム */
  className?: string;
}

const AuthContainerPresenter = (props: Props) => {
  //state
  const [signup, , turnOnSignup] = useToggle();

  return (
    <Grid className={props.className}>
      <Row>
        {!signup && <LoginSegment className="login-segment" />}
        {signup && <SignupSegment className="signup-segment" />}
      </Row>
      <Row textAlign="center">
        {!signup && (
          <div onClick={turnOnSignup} className="signup-button">
            sign up
          </div>
        )}
        {signup && <div className="try-button">試しに使ってみる</div>}
      </Row>
    </Grid>
  );
};

export const AuthContainer = styled(AuthContainerPresenter)`
  &&&&& {
    .login-segment {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    .signup-segment {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    .signup-button {
      font-size: 1.3rem;
      color: rgba(0, 0, 0, 0.45);
    }
    .try-button {
      font-size: 1.1rem;
      color: rgba(0, 0, 0, 0.45);
    }
  }
`;
