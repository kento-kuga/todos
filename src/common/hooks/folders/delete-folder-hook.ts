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
  const [taskFolders, setTaskFolders] = useTaskFolders();

  const deleteFolder = async (deleteTaskFolderIdList: string[]) => {
    if (state.isTryUser) {
      //体験ユーザーの場合
      //フォルダーリストから、削除対象フォルダーを排除する。
      const tmpTaskFolders = [...taskFolders].filter(
        (folder) =>
          !deleteTaskFolderIdList.some((id) => id === folder.taskFolderId)
      );

      //コンテキストにフォルダーリストをセット。
      setTaskFolders(tmpTaskFolders || []);
    } else {
      //体験ユーザーではない場合
      //フォルダー削除
      await TaskFolders.delete(
        deleteTaskFolderIdList,
        userInfo,
        state.appListener
      );

      //ユーザー情報再取得
      const tmpUserInfo = await User.getByUserId(
        userInfo?.userId,
        state.appListener
      );
      if (tmpUserInfo) {
        setUserInfo(tmpUserInfo);
      }

      //フォルダー情報再取得
      const tmpTaskFolders = await TaskFolders.getByFolderIdList(
        tmpUserInfo?.taskFolderIdList || [],
        state.appListener
      );
      setTaskFolders(tmpTaskFolders || []);
    }
  };

  return deleteFolder;
};
