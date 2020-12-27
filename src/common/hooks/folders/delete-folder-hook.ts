//eslint-disable-next-line
import React from "react";
import {
  deleteTaskFolders,
  getTaskFolders,
} from "../../../repositories/task-folder-repository";
import { getUser } from "../../../repositories/user-repository";
import { useAppContext } from "../../context/app-context";
import { useUserInfo } from "../common/user-info-hook";
import { useTaskFolders } from "./task-folders-hook";

/** フォルダー削除Hooks */
export const useDeleteFolder = () => {
  //hooks
  const [state] = useAppContext();
  const [userInfo, setUserInfo] = useUserInfo();
  const [, setTaskFolders] = useTaskFolders();

  const deleteFolder = async (taskFolderIdList: string[]) => {
    //フォルダー削除
    await deleteTaskFolders(taskFolderIdList, userInfo, state.appListener);

    //ユーザー情報再取得
    const tmpUserInfo = await getUser(userInfo.userId, state.appListener);
    if (tmpUserInfo) {
      setUserInfo(tmpUserInfo);
    }

    //フォルダー情報再取得
    const tmpTaskFolders = await getTaskFolders(
      tmpUserInfo.taskFolderIdList,
      state.appListener
    );
    setTaskFolders(tmpTaskFolders || []);
  };
  return deleteFolder;
};
