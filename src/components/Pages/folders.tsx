import React from "react";
import { UserInfo } from "../../common/dto/app";
import { useTaskFolders } from "../../common/hooks/useTaskFolders";
import { FoldersTemplate } from "../Templates/folders-template";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
}

export const Folders = (props: Props) => {
  //state
  const [taskFolders] = useTaskFolders(props.userInfo.taskFolderIdList);

  return (
    <FoldersTemplate userInfo={props.userInfo} taskFolderList={taskFolders} />
  );
};
