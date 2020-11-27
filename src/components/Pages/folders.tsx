import React from "react";
import { UserInfo } from "../../common/dto/user";
import { useCreateFolder } from "../../common/hooks/useCreateFolder";
import { useTaskFolders } from "../../common/hooks/useTaskFolders";
import { FoldersTemplate } from "../Templates/folders-template";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
}

export const Folders = (props: Props) => {
  //state
  //タスクフォルダーリスト
  const [taskFolders] = useTaskFolders(props.userInfo.taskFolderIdList);

  //function

  return (
    <FoldersTemplate userInfo={props.userInfo} taskFolderList={taskFolders} />
  );
};
