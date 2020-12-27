import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FoldersFormParams, TaskFolderInfo } from "../../common/dto/taskFolder";
import { UserInfo } from "../../common/dto/user";
import { useCreateFolder } from "../../common/hooks/folders/useCreateFolder";
import { useDeleteFolder } from "../../common/hooks/folders/useDeleteFolder";
import { useTaskFolders } from "../../common/hooks/folders/useTaskFolders";
import { useUpdateFolderName } from "../../common/hooks/folders/useUpdateFolderName";
import { FoldersTemplate } from "../Templates/folders-template";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
}

export const Folders = (props: Props) => {
  //hooks
  //フォルダー作成Hook
  const createFolder = useCreateFolder();
  //フォルダー削除処理
  const deleteFolder = useDeleteFolder();
  //フォルダー名更新処理
  const updateFolderName = useUpdateFolderName();
  //フォームパーツ
  const methods = useForm<FoldersFormParams>();
  //ヒストリー
  const history = useHistory();

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
  //フォルダー作成時ハンドラー
  const handleCreateFolder = React.useCallback(
    (createFolderName: string) => {
      //フォルダー作成
      createFolder(createFolderName);
    },
    [createFolder]
  );

  //フォルダー削除時ハンドラー
  const handleDeleteFolders = React.useCallback(() => {
    //フォルダー削除
    deleteFolder(selectedFolderIdList);

    //選択フォルダーリスト初期化
    setSelectedFolderIdList([]);

    //編集モード解除
    setEditMode(false);
  }, [deleteFolder, selectedFolderIdList]);

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

  //フォルダークリック時ハンドラ
  const handleClickFolder = React.useCallback(
    (taskFolderInfo: TaskFolderInfo) => {
      //編集中の場合、何もしない。
      if (editMode) return;

      //タスクリスト画面へ遷移
      history.push("/tasks", { taskFolderInfo: taskFolderInfo });
    },
    [editMode, history]
  );

  return (
    <FormProvider {...methods}>
      <FoldersTemplate
        userInfo={props.userInfo}
        taskFolderList={taskFolders}
        editMode={editMode}
        setEditMode={setEditMode}
        createFolderOpen={createFolderOpen}
        setCreateFolderOpen={setCreateFolderOpen}
        handleCreateFolder={handleCreateFolder}
        handleDeleteFolders={handleDeleteFolders}
        handleUpdateFolderName={handleUpdateFolderName}
        handleClickFolder={handleClickFolder}
        selectedFolderIdList={selectedFolderIdList}
        setSelectedFolderIdList={setSelectedFolderIdList}
      />
    </FormProvider>
  );
};
