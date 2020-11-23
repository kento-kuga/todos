import React from "react";
import styled from "styled-components";
import { TopTemplate } from "../Templates/top-template";

interface Props {}

const TopPresenter = (props: Props) => {
  return <TopTemplate />;
};

export const Top = styled(TopPresenter)``;
