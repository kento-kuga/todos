import React from "react";
import { useHistory } from "react-router-dom";
import {
  FoldersFormParams,
  TaskFolderInfo,
} from "../../common/dto/task-folder";
import { useToggle } from "../../common/hooks/common/toggle-hook";
import { UseFoldersHandler } from "../../common/hooks/folders/folders-handler-hook";
import { useTaskFolder } from "../../common/hooks/tasks/task-folder-hook";
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
  /** フォルダー名編集中フォルダーId */
  editingNameFolderId: string;
  /** フォルダー名編集中フォルダーIdセット関数 */
  setEditingNameFolderId: React.Dispatch<React.SetStateAction<string>>;
}

export const TaskFolderController = (props: Props) => {
  //hooks
  //ヒストリー
  const history = useHistory();
  //タスクフォルダーフック
  const [, setTaskFolder] = useTaskFolder();

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
  //操作不可フラグ
  const [disable, setDisable] = React.useState(false);

  //effect
  React.useEffect(() => {
    if (!props.editMode) {
      //編集モードが解除されたら、ステートをリセットする。
      turnOffEditFolderNameMode();
      turnOffSelected();
    }
  }, [props.editMode, turnOffEditFolderNameMode, turnOffSelected]);

  React.useEffect(() => {
    if (props.editingNameFolderId === "") {
      //編集中フォルダーIdが空の場合
      if (disable) {
        //操作不可だった場合
        //解除する
        setDisable(false);
      } else {
        //それ以外の場合
        //何もしない
        return;
      }
    } else if (
      props.editingNameFolderId !== props.taskFolderInfo.taskFolderId
    ) {
      //他のフォルダーがフォルダー名編集中の場合
      //操作不可にする
      setDisable(true);
    }
  }, [disable, props.editingNameFolderId, props.taskFolderInfo.taskFolderId]);

  //function
  //フォルダーズハンドラー
  const { handleUpdateFolderName } = UseFoldersHandler();

  //function
  //選択チェックボックスカラム押下時
  const handleSelectCheckBoxColumn = () => {
    //フォルダーネーム編集中の場合、何もしない。
    if (editFolderNameMode) return;
    //操作不可の場合何もしない
    if (disable) return;

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
    //操作不可の場合何もしない
    if (disable) return;

    turnOnEditFolderNameMode();
    //タスクフォルダーIdを編集中フォルダーIdにセットする。
    props.setEditingNameFolderId(props.taskFolderInfo.taskFolderId);

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
    //フォルダー名編集中フォルダーIdを初期化
    props.setEditingNameFolderId("");
    turnOffEditFolderNameMode();
  };

  //フォルダークリック時ハンドラ
  const handleClickFolder = React.useCallback(() => {
    //編集中の場合、何もしない。
    if (props.editMode) return;

    //タスクフォルダーをコンテキストにセット
    setTaskFolder(props.taskFolderInfo);

    //タスクリスト画面へ遷移
    history.push("/tasks");
  }, [history, props.editMode, props.taskFolderInfo, setTaskFolder]);

  return (
    <>
      {props.editMode ? (
        <EditingNameTaskFolder
          taskFolderInfo={props.taskFolderInfo}
          editFolderNameMode={editFolderNameMode}
          disableEditFolderName={disable}
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
