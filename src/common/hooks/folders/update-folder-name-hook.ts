import { useAppContext } from "../../context/app-context";
import { TaskFolderUpdateReq } from "../../dto/task-folder";
import { useTaskFolders } from "./task-folders-hook";
import { useUserInfo } from "../common/user-info-hook";
import { TaskFolderRepository } from "../../../repositories/task-folder-repository";
import { TaskFoldersRepository } from "../../../repositories/task-folders-repository";

/** フォルダーネーム更新Hooks */
export const useUpdateFolderName = () => {
  //repository
  const TaskFolder = new TaskFolderRepository();
  const TaskFolders = new TaskFoldersRepository();

  //hooks
  const [state] = useAppContext();
  const [userInfo] = useUserInfo();
  const [taskFolders, setTaskFolders] = useTaskFolders();

  const updateFolderName = async (
    taskFolderId: string,
    updateFolderName: string
  ) => {
    if (state.isTryUser) {
      //体験ユーザーの場合
      //変更対象のフォルダーを抽出
      const tmpTaskFolders = [...taskFolders];
      const tmpFolder = tmpTaskFolders.find(
        (folder) => folder.taskFolderId === taskFolderId
      );

      if (tmpFolder) {
        //名前更新
        tmpFolder.folderName = updateFolderName;
        //コンテキストにセット
        setTaskFolders(tmpTaskFolders);
      }
    } else {
      //体験ユーザーではない場合
      //フォルダー更新
      await TaskFolder.update(
        taskFolderId,
        { folderName: updateFolderName } as TaskFolderUpdateReq,
        state.appListener
      );

      //フォルダー情報再取得
      const tmpTaskFolders = await TaskFolders.getByFolderIdList(
        userInfo?.taskFolderIdList || [],
        state.appListener
      );
      setTaskFolders(tmpTaskFolders || []);
    }
  };
  return updateFolderName;
};
