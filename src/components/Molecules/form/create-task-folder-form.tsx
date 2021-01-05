import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { commonInputStyle } from "../../../common/css/common-style";
import { FoldersFormParams } from "../../../common/dto/task-folder";
import { ErrorMessageDiv, Form, FormButtonArea, Input } from "../../atoms/form";

interface Props {
  /** フォルダー作成時ハンドラ */
  handleCreateFolder: (data: FoldersFormParams) => void;
  /** クラスネーム */
  className?: string;
}

const CreateTaskFolderFormPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { control, errors, handleSubmit } = useFormContext();

  //function
  return (
    <div className={props.className}>
      <Form onSubmit={handleSubmit(props.handleCreateFolder)}>
        <Input
          name="createFolderName"
          placeholder="folder name"
          control={control}
          defaultValue=""
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
        <FormButtonArea textAlign="right"></FormButtonArea>
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
