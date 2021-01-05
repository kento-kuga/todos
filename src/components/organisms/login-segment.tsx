import React from "react";
import styled from "styled-components";
import { Segment } from "../atoms/segment";
import { LoginForm } from "../molecules/form/login-form";

interface Props {
  /** クラスネーム */
  className?: string;
}

const LoginSegmentPresenter = (props: Props) => {
  return (
    <Segment className={props.className}>
      <LoginForm />
    </Segment>
  );
};

export const LoginSegment = styled(LoginSegmentPresenter)`
  &&&&& {
    padding: 2rem;
  }
`;
