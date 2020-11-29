import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { createTaskFolderForm } from "../../../common/dto/taskFolder";
import { useCreateFolder } from "../../../common/hooks/useCreateFolder";
import { Button } from "../../Atoms/button";
import { ErrorMessageDiv, Form, FormButtonArea, Input } from "../../Atoms/form";
import { Label } from "../../Atoms/text";

interface Props {
  /** 送信ハンドラー */
  handleSubmit?: () => void;
  /** クラスネーム */
  className?: string;
}

const CreateTaskFormPresenter = (props: Props) => {
  //hooks
  //フォルダー作成Hook
  const createFolder = useCreateFolder();

  //フォームパーツ
  const { control, errors, handleSubmit } = useForm<createTaskFolderForm>();

  //function
  //送信ハンドラー
  const onSubmit = (data: createTaskFolderForm) => {
    //フォルダー作成
    createFolder(data.folderName);
    if (props.handleSubmit) {
      props.handleSubmit();
    }
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
        />
        <ErrorMessageDiv
          name="folderName"
          errors={errors}
          redFont
          className="error-folder-name"
        />
        <FormButtonArea textAlign="right">
          <Button label="OK" size="small" color="black" />
        </FormButtonArea>
      </Form>
    </div>
  );
};

export const CreateTaskForm = styled(CreateTaskFormPresenter)`
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
