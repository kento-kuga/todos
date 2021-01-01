import { TaskFoldersRepository } from "../../../repositories/task-folders-repository";
import { UserRepository } from "../../../repositories/user-repository";
import { useAppContext } from "../../context/app-context";
import { useUserInfo } from "../common/user-info-hook";
import { useTaskFolders } from "./task-folders-hook";

/** フォルダー削除Hooks */
export const useDeleteFolder = () => {
  //repository
  const User = new UserRepository();
  const TaskFolders = new TaskFoldersRepository();

  //hooks
  const [state] = useAppContext();
  const [userInfo, setUserInfo] = useUserInfo();
  const [, setTaskFolders] = useTaskFolders();

  const deleteFolder = async (taskFolderIdList: string[]) => {
    //フォルダー削除
    await TaskFolders.delete(taskFolderIdList, userInfo, state.appListener);

    //ユーザー情報再取得
    const tmpUserInfo = await User.getByUserId(
      userInfo.userId,
      state.appListener
    );
    if (tmpUserInfo) {
      setUserInfo(tmpUserInfo);
    }

    //フォルダー情報再取得
    const tmpTaskFolders = await TaskFolders.getByFolderIdList(
      tmpUserInfo.taskFolderIdList,
      state.appListener
    );
    setTaskFolders(tmpTaskFolders || []);
  };
  return deleteFolder;
};
