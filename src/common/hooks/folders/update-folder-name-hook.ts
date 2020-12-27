import {
  getTaskFolders,
  updateTaskFolder,
} from "../../../repositories/task-folder-repository";
import { useAppContext } from "../../context/app-context";
import { TaskFolderUpdateReq } from "../../dto/task-folder";
import { useTaskFolders } from "./task-folders-hook";
import { useUserInfo } from "../common/user-info-hook";

/** フォルダーネーム更新Hooks */
export const useUpdateFolderName = () => {
  //hooks
  const [state] = useAppContext();
  const [userInfo] = useUserInfo();
  const [, setTaskFolders] = useTaskFolders();

  const updateFolderName = async (
    taskFolderId: string,
    updateFolderName: string
  ) => {
    //フォルダー更新
    await updateTaskFolder(
      taskFolderId,
      { folderName: updateFolderName } as TaskFolderUpdateReq,
      state.appListener
    );

    //フォルダー情報再取得
    const tmpTaskFolders = await getTaskFolders(
      userInfo.taskFolderIdList,
      state.appListener
    );
    setTaskFolders(tmpTaskFolders || []);
  };
  return updateFolderName;
};