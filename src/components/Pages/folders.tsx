import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FoldersFormParams } from "../../common/dto/task-folder";
import { UserInfo } from "../../common/dto/user";
import { useTaskFolders } from "../../common/hooks/folders/task-folders-hook";
import { FoldersTemplate } from "../templates/folders-template";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo | null;
}

export const Folders = (props: Props) => {
  //hooks
  //フォームパーツ
  const methods = useForm<FoldersFormParams>();
  //state
  //タスクフォルダーリスト
  const [taskFolders] = useTaskFolders(props.userInfo?.taskFolderIdList);

  return (
    <FormProvider {...methods}>
      <FoldersTemplate userInfo={props.userInfo} taskFolderList={taskFolders} />
    </FormProvider>
  );
};
