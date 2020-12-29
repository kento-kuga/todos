import React from "react";
import { useCreateFolder } from "./create-folder-hook";
import { useDeleteFolder } from "./delete-folder-hook";
import { useUpdateFolderName } from "./update-folder-name-hook";

export const UseFoldersHandler = () => {
  //フォルダー作成Hook
  const createFolder = useCreateFolder();
  //フォルダー名更新処理
  const updateFolderName = useUpdateFolderName();
  //hooks
  //フォルダー削除関数
  const deleteFolder = useDeleteFolder();

  //フォルダー作成時ハンドラー
  const handleCreateFolder = React.useCallback(
    (createFolderName: string) => {
      //フォルダー名が未入力の場合、何もしない
      if (!createFolderName) return;

      //フォルダー作成
      createFolder(createFolderName);
    },
    [createFolder]
  );

  //フォルダー名更新時ハンドラー
  const handleUpdateFolderName = React.useCallback(
    (taskFolderId: string, prevFolderName: string, newFolderName?: string) => {
      //フォルダー名が未入力の場合、何もしない
      if (!newFolderName) return;
      //変更前のフォルダー名と同じなら、何もしない
      if (prevFolderName === newFolderName) return;

      //フォルダー名更新
      updateFolderName(taskFolderId, newFolderName);
    },
    [updateFolderName]
  );

  //フォルダー削除時ハンドラー
  const handleDeleteFolders = React.useCallback(
    (taskFolderIdList: string[]) => {
      //フォルダーリスト削除
      deleteFolder(taskFolderIdList);
    },
    []
  );

  return {
    handleCreateFolder,
    handleUpdateFolderName,
    handleDeleteFolders,
  };
};
