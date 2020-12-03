import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { CreateTaskFolderFormParams } from "../../../common/dto/taskFolder";
import { Button } from "../../Atoms/button";
import { ErrorMessageDiv, Form, FormButtonArea, Input } from "../../Atoms/form";
import { Label } from "../../Atoms/text";

interface Props {
  /** 送信ハンドラー */
  handleSubmit: (folderName: string) => void;
  /** クラスネーム */
  className?: string;
}

const CreateTaskFolderFormPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { control, errors, handleSubmit } = useFormContext();

  //function
  //送信ハンドラー
  const onSubmit = (data: CreateTaskFolderFormParams) => {
    props.handleSubmit(data.folderName);
  };
  return (
    <div className={props.className}>
      <Label label="フォルダー名" fontSize="large" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="folderName"
          control={control}
          defaultValue=""
          isError={errors.folderName ? true : false}
          fluid
          maxlength={20}
          rules={{
            required: "必ず入力してください。",
            maxLength: {
              value: 20,
              message: "20文字以内で入力してください。",
            },
          }}
          className="folder-name"
          testid="create-task-folder-form-input"
        />
        <ErrorMessageDiv
          name="folderName"
          errors={errors}
          redFont
          className="error-folder-name"
        />
        <FormButtonArea textAlign="right">
          <Button
            label="OK"
            size="small"
            color="black"
            testid="create-task-folder-form-submit-button"
          />
        </FormButtonArea>
      </Form>
    </div>
  );
};

export const CreateTaskFolderForm = styled(CreateTaskFolderFormPresenter)`
  &&&&& {
    .folder-name {
      padding-top: 1rem;
      input {
        border-width: 0 0 2px 0;
        border-radius: 0;
        border-color: #000;
        font-size: 1.2rem;
        padding: 0;
        padding-bottom: 0.2rem;
        &:focus {
          outline: none;
        }
      }
    }
  }
`;
