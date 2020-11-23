import React from "react";
import styled from "styled-components";
import { Container } from "../Atoms/container/container";
import { AppHeader } from "./header/app-header";

interface Props {
  /** クラスネーム */
  className?: string;
}

const AppContainerPresenter: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <AppHeader />
      <Container className={props.className}>{children}</Container>
    </>
  );
};

export const AppContainer = styled(AppContainerPresenter)`
  &&&&& {
    margin-top: 1rem;
  }
`;
