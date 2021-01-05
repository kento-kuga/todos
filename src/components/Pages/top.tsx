import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { UserAuthFormParam } from "../../common/dto/user";
import { TopTemplate } from "../templates/top-template";

interface Props {}

const TopPresenter = (props: Props) => {
  //フォームパーツ
  const methods = useForm<UserAuthFormParam>();

  return (
    <FormProvider {...methods}>
      <TopTemplate />
    </FormProvider>
  );
};

export const Top = styled(TopPresenter)``;
