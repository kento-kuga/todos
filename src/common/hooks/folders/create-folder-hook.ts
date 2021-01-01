import { TaskFolderRepository } from "../../../repositories/task-folder-repository";
import { TaskFoldersRepository } from "../../../repositories/task-folders-repository";
import { UserRepository } from "../../../repositories/user-repository";
import { useAppContext } from "../../context/app-context";
import { useUserInfo } from "../common/user-info-hook";
import { useTaskFolders } from "./task-folders-hook";

/** フォルダー作成Hooks */
export const useCreateFolder = () => {
  //repository
  const User = new UserRepository();
  const TaskFolder = new TaskFolderRepository();
  const TaskFolders = new TaskFoldersRepository();

  //state
  const [state] = useAppContext();
  const [userInfo, setUserInfo] = useUserInfo();
  const [, setTaskFolders] = useTaskFolders();

  const createFolder = async (createFolderName: string) => {
    //フォルダー作成
    await TaskFolder.create(createFolderName, userInfo, state.appListener);

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
    if (tmpTaskFolders) {
      setTaskFolders(tmpTaskFolders);
    }
  };

  return createFolder;
};
