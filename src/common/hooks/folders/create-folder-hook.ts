import {
  createTaskFolder,
  getTaskFolders,
} from "../../../repositories/task-folder-repository";
import { UserRepository } from "../../../repositories/user-repository";
import { useAppContext } from "../../context/app-context";
import { useUserInfo } from "../common/user-info-hook";
import { useTaskFolders } from "./task-folders-hook";

/** フォルダー作成Hooks */
export const useCreateFolder = () => {
  //repository
  const User = new UserRepository();

  //state
  const [state] = useAppContext();
  const [userInfo, setUserInfo] = useUserInfo();
  const [, setTaskFolders] = useTaskFolders();

  const createFolder = async (createFolderName: string) => {
    //フォルダー作成
    await createTaskFolder(createFolderName, userInfo, state.appListener);

    //ユーザー情報再取得
    const tmpUserInfo = await User.getByUserId(
      userInfo.userId,
      state.appListener
    );
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
