import {
  getTaskFolders,
  updateTaskFolder,
} from "../../repositories/taskFolderRepository";
import { useAppContext } from "../context/AppContext";
import { TaskFolderUpdateReq } from "../dto/taskFolder";
import { useTaskFolders } from "./useTaskFolders";
import { useUserInfo } from "./useUserInfo";

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
      { updateFolderName: updateFolderName } as TaskFolderUpdateReq,
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
