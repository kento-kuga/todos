import React from "react";
import styled from "styled-components";

import { Segment } from "../atoms/segment";
import { SignupForm } from "../molecules/form/signup-form";

interface Props {
  /** クラスネーム */
  className?: string;
}

const SignupSegmentPresenter = (props: Props) => {
  return (
    <Segment className={props.className}>
      <SignupForm />
    </Segment>
  );
};

export const SignupSegment = styled(SignupSegmentPresenter)`
  &&&&& {
    padding: 2rem;
  }
`;
