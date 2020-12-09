import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { commonInputStyle } from "../../../common/css/common-style";
import { Form, Input } from "../../Atoms/form";

interface Props {
  /** デフォルトフォルダー名 */
  defaultFolderName: string;
  /** 送信ハンドラー */
  handleSubmit?: any;
  /** クラスネーム */
  className?: string;
}

const UpdateTaskFolderNameFormPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { control } = useFormContext();

  return (
    <div className={props.className}>
      <Form onSubmit={props.handleSubmit}>
        <Input
          name="updateFolderName"
          control={control}
          defaultValue={props.defaultFolderName}
          fluid
          maxlength={14}
          rules={{
            maxLength: 14,
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
      ${commonInputStyle}
      font-size: 1.3rem;
      padding: 0;
      padding-top: 0.1rem;
    }
  }
`;
