//eslint-disable-next-line
import React from "react";
import {
  deleteTaskFolders,
  getTaskFolders,
} from "../../repositories/taskFolderRepository";
import { getUser } from "../../repositories/userRepository";
import { useAppContext } from "../context/AppContext";
import { useUserInfo } from "./useUserInfo";
import { useTaskFolders } from "./useTaskFolders";

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
