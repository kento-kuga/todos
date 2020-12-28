import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { commonInputStyle } from "../../../common/css/common-style";
import { FoldersFormParams } from "../../../common/dto/task-folder";
import { Button } from "../../atoms/button";
import { ErrorMessageDiv, Form, FormButtonArea, Input } from "../../atoms/form";
import { Label } from "../../atoms/text";

interface Props {
  /** 送信ハンドラー */
  handleSubmit: (createFolderName: string) => void;
  /** クラスネーム */
  className?: string;
}

const CreateTaskFolderFormPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { control, errors, handleSubmit } = useFormContext();

  //function
  //送信ハンドラー
  const onSubmit = (data: FoldersFormParams) => {
    props.handleSubmit(data.createFolderName);
  };
  return (
    <div className={props.className}>
      <Label label="フォルダー名" fontSize="large" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="createFolderName"
          control={control}
          defaultValue=""
          isError={errors.createFolderName ? true : false}
          fluid
          maxlength={14}
          rules={{
            required: "必ず入力してください。",
            maxLength: {
              value: 14,
              message: "14文字以内で入力してください。",
            },
          }}
          className="folder-name"
          testid="create-task-folder-form-input"
        />
        <ErrorMessageDiv
          name="createFolderName"
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
        ${commonInputStyle}
      }
    }
  }
`;
