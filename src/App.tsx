import React from "react";
import { useTaskFolders, useUserInfo } from "./common/context/AppContext";

export const App = () => {
  //state
  const [userInfo, setUserInfo] = useUserInfo("CEvyiSVHk0UEz092sWuq");
  const [taskFolders, setTaskFolders] = useTaskFolders(userInfo.taskFolders);

  React.useEffect(() => {
    console.log("App -> userInfo", userInfo);
  }, [userInfo]);

  React.useEffect(() => {
    console.log("App -> taskFolders", taskFolders);
  }, [taskFolders]);

  return (
    <>
      <div>ニックネーム：{userInfo.name}</div>
      <div>タスクフォルダー一覧</div>
      <ul>
        {taskFolders.map((folder, i) => {
          return <li key={i}>{folder.folderName}</li>;
        })}
      </ul>
    </>
  );
};
