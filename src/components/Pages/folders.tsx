import React from "react";
import { UserInfo } from "../../common/dto/user";
import { useDeleteFolder } from "../../common/hooks/useDeleteFolder";
import { useTaskFolders } from "../../common/hooks/useTaskFolders";
import { useUpdateFolderName } from "../../common/hooks/useUpdateFolderName";
import { FoldersTemplate } from "../Templates/folders-template";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
}

export const Folders = (props: Props) => {
  //hooks
  //フォルダー削除処理
  const deleteFolder = useDeleteFolder();
  //フォルダー名更新処理
  const updateFolderName = useUpdateFolderName();

  //state
  //タスクフォルダーリスト
  const [taskFolders] = useTaskFolders(props.userInfo.taskFolderIdList);
  //タスクフォルダー作成モーダルフラグ
  const [createFolderOpen, setCreateFolderOpen] = React.useState(false);
  //編集モードフラグ
  const [editMode, setEditMode] = React.useState(false);
  //選択済フォルダーIdリスト
  const [selectedFolderIdList, setSelectedFolderIdList] = React.useState(
    [] as string[]
  );

  //function
  //フォルダー削除時ハンドラー
  const handleDeleteFolders = (selectedFolderIdList: string[]) => {
    //フォルダー削除
    deleteFolder(selectedFolderIdList);

    //選択フォルダーリスト初期化
    setSelectedFolderIdList([]);

    //編集モード解除
    setEditMode(false);
  };

  //フォルダー名更新時ハンドラー
  const handleUpdateFolderName = (
    taskFolderId: string,
    prevFolderName: string,
    newFolderName?: string
  ) => {
    //フォルダー名が未入力の場合、何もしない
    if (!newFolderName) return;
    //変更前のフォルダー名と同じなら、何もしない
    if (prevFolderName === newFolderName) return;

    //フォルダー名更新
    updateFolderName(taskFolderId, newFolderName);
  };

  return (
    <FoldersTemplate
      userInfo={props.userInfo}
      taskFolderList={taskFolders}
      editMode={editMode}
      setEditMode={setEditMode}
      createFolderOpen={createFolderOpen}
      setCreateFolderOpen={setCreateFolderOpen}
      handleDeleteFolders={handleDeleteFolders}
      handleUpdateFolderName={handleUpdateFolderName}
      selectedFolderIdList={selectedFolderIdList}
      setSelectedFolderIdList={setSelectedFolderIdList}
    />
  );
};
