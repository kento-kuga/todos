import { TaskFolderRepository } from "../../../repositories/task-folder-repository";
import { TaskFoldersRepository } from "../../../repositories/task-folders-repository";
import { UserRepository } from "../../../repositories/user-repository";
import { useAppContext } from "../../context/app-context";
import { TaskFolderInfo } from "../../dto/task-folder";
import { createRandomString } from "../../helper/util-function";
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
  const [taskFolders, setTaskFolders] = useTaskFolders();

  const createFolder = async (createFolderName: string) => {
    if (state.isTryUser) {
      //体験ユーザーの場合
      //フォルダー作成
      const tmpFolder = new TaskFolderInfo();
      tmpFolder.folderName = createFolderName;
      tmpFolder.taskFolderId = createRandomString();

      //コンテキストにセット
      const tmpTaskFolders = [...taskFolders];
      tmpTaskFolders.push(tmpFolder);

      setTaskFolders(tmpTaskFolders);
    } else {
      //体験ユーザー以外の場合
      //フォルダー作成
      await TaskFolder.create(createFolderName, userInfo, state.appListener);

      //ユーザー情報再取得
      const tmpUserInfo = await User.getByUserId(
        userInfo?.userId,
        state.appListener
      );
      if (tmpUserInfo) {
        //ユーザーが取得できた場合
        setUserInfo(tmpUserInfo);

        //フォルダー情報再取得
        const tmpTaskFolders = await TaskFolders.getByFolderIdList(
          tmpUserInfo.taskFolderIdList,
          state.appListener
        );

        if (tmpTaskFolders) {
          setTaskFolders(tmpTaskFolders);
        }
      }
    }
  };

  return createFolder;
};
