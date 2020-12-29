import React from "react";
import { useHistory } from "react-router-dom";
import {
  FoldersFormParams,
  TaskFolderInfo,
} from "../../common/dto/task-folder";
import { useToggle } from "../../common/hooks/common/toggle-hook";
import { UseFoldersHandler } from "../../common/hooks/folders/folders-handler-hook";
import { EditingNameTaskFolder } from "../molecules/folder/editing-name-task-folder";
import { TaskFolder } from "../molecules/folder/task-folder";

interface Props {
  //タスクフォルダー情報
  taskFolderInfo: TaskFolderInfo;
  /** 編集モード */
  editMode: boolean;
  /** 選択済フォルダーIdリスト */
  selectedFolderIdList: string[];
  /** 選択済フォルダーIdリストセット関数 */
  setSelectedFolderIdList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TaskFolderController = (props: Props) => {
  //hooks
  //ヒストリー
  const history = useHistory();

  //state
  //フォルダーネーム編集モード
  const [
    editFolderNameMode,
    ,
    turnOnEditFolderNameMode,
    turnOffEditFolderNameMode,
  ] = useToggle();

  //選択済み
  const [selected, , turnOnSelected, turnOffSelected] = useToggle();

  //effect
  React.useEffect(() => {
    if (!props.editMode) {
      //編集モードが解除されたら、ステートをリセットする。
      turnOffEditFolderNameMode();
      turnOffSelected();
    }
  }, [props.editMode, turnOffEditFolderNameMode, turnOffSelected]);

  //function
  //フォルダーズハンドラー
  const { handleUpdateFolderName } = UseFoldersHandler();

  //function

  //選択チェックボックスカラム押下時
  const handleSelectCheckBoxColumn = () => {
    //フォルダーネーム編集中の場合、何もしない。
    if (editFolderNameMode) return;

    if (!selected) {
      //未選択の場合
      turnOnSelected();
      //選択済フォルダーIdリストに追加
      const tmpList = [...props.selectedFolderIdList];
      tmpList.push(props.taskFolderInfo.taskFolderId);
      props.setSelectedFolderIdList(tmpList);
    } else {
      //選択済みの場合
      turnOffSelected();

      //選択済フォルダーIdリストから削除
      const tmpList = props.selectedFolderIdList.filter(
        (id) => id !== props.taskFolderInfo.taskFolderId
      );
      props.setSelectedFolderIdList(tmpList);
    }
  };

  //フォルダーネーム編集ボタン押下時
  const handleEditFolderName = () => {
    turnOnEditFolderNameMode();

    //選択されていた場合、選択を解除
    if (selected) {
      turnOffSelected();

      //選択済フォルダーIdリストから削除
      const tmpList = props.selectedFolderIdList.filter(
        (id) => id !== props.taskFolderInfo.taskFolderId
      );
      props.setSelectedFolderIdList(tmpList);
    }
  };

  //フォルダーネーム確定ボタン押下時
  const handleFixeFolderName = (data: FoldersFormParams) => {
    //フォルダーネーム更新
    handleUpdateFolderName(
      props.taskFolderInfo.taskFolderId,
      props.taskFolderInfo.folderName,
      data.updateFolderName
    );
    turnOffEditFolderNameMode();
  };

  //フォルダークリック時ハンドラ
  const handleClickFolder = React.useCallback(() => {
    //編集中の場合、何もしない。
    if (props.editMode) return;

    //タスクリスト画面へ遷移
    history.push("/tasks", { taskFolderInfo: props.taskFolderInfo });
  }, [history, props.editMode, props.taskFolderInfo]);

  return (
    <>
      {props.editMode ? (
        <EditingNameTaskFolder
          taskFolderInfo={props.taskFolderInfo}
          editFolderNameMode={editFolderNameMode}
          selected={selected}
          handleSelectCheckBoxColumn={handleSelectCheckBoxColumn}
          handleFixeFolderName={handleFixeFolderName}
          handleEditFolderName={handleEditFolderName}
          handleUpdateFolderName={handleUpdateFolderName}
        />
      ) : (
        <TaskFolder
          taskFolderInfo={props.taskFolderInfo}
          editMode={props.editMode}
          handleClickFolder={handleClickFolder}
        />
      )}
    </>
  );
};
