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
  const [, setTaskFolders] = useTaskFolders();

  const updateFolderName = async (
    taskFolderId: string,
    updateFolderName: string
  ) => {
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
  };
  return updateFolderName;
};
