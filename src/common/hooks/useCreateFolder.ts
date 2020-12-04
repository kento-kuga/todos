//eslint-disable-next-line
import React from "react";
import {
  createTaskFolder,
  getTaskFolders,
} from "../../repositories/taskFolderRepository";
import { getUser } from "../../repositories/userRepository";
import { useAppContext } from "../context/AppContext";
import { useUserInfo } from "../hooks/useUserInfo";
import { useTaskFolders } from "./useTaskFolders";

/** フォルダー作成Hooks */
export const useCreateFolder = () => {
  //state
  const [state] = useAppContext();
  const [userInfo, setUserInfo] = useUserInfo();
  const [, setTaskFolders] = useTaskFolders();

  const createFolder = async (createFolderName: string) => {
    //フォルダー作成
    await createTaskFolder(createFolderName, userInfo, state.appListener);

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
    if (tmpTaskFolders) {
      setTaskFolders(tmpTaskFolders);
    }
  };

  return createFolder;
};
