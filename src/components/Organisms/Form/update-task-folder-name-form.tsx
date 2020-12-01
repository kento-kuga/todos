import React from "react";
import { Control } from "react-hook-form";
import styled from "styled-components";
import { UpdateTaskFolderFormParams } from "../../../common/dto/taskFolder";
import { Form, Input } from "../../Atoms/form";

interface Props {
  /** デフォルトフォルダー名 */
  defaultFolderName: string;
  /** 送信ハンドラー */
  handleSubmit?: any;
  /** フォームコントロール */
  control: Control<UpdateTaskFolderFormParams>;
  /** クラスネーム */
  className?: string;
}

const UpdateTaskFolderNameFormPresenter = (props: Props) => {
  return (
    <div className={props.className}>
      <Form onSubmit={props.handleSubmit}>
        <Input
          name="folderName"
          control={props.control}
          defaultValue={props.defaultFolderName}
          fluid
          maxlength={20}
          rules={{
            maxLength: 20,
          }}
          className="folder-name"
        />
      </Form>
    </div>
  );
};

export const UpdateTaskFolderNameForm = styled(
  UpdateTaskFolderNameFormPresenter
)`
  &&&&& {
    input {
      border-width: 0 0 2px 0;
      border-radius: 0;
      border-color: #000;
      font-size: 1.3rem;
      padding: 0;
      padding-top: 0.1rem;
      &:focus {
        outline: none;
      }
    }
  }
`;
