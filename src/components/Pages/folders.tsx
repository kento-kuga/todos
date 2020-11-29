import React from "react";
import { UserInfo } from "../../common/dto/user";
import { useDeleteFolder } from "../../common/hooks/useDeleteFolder";
import { useTaskFolders } from "../../common/hooks/useTaskFolders";
import { FoldersTemplate } from "../Templates/folders-template";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
}

export const Folders = (props: Props) => {
  //hooks
  const deleteFolder = useDeleteFolder();

  //state
  //タスクフォルダーリスト
  const [taskFolders] = useTaskFolders(props.userInfo.taskFolderIdList);

  //function
  //削除ボタン押下時ハンドラー
  const handleClickDelete = (taskFolderId: string) => {
    //フォルダー削除
    deleteFolder(taskFolderId);
  };

  return (
    <FoldersTemplate
      userInfo={props.userInfo}
      taskFolderList={taskFolders}
      handleClickDelete={handleClickDelete}
    />
  );
};
