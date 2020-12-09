import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import {
  TaskFolderInfo,
  FoldersFormParams,
} from "../../../common/dto/taskFolder";
import { Icon } from "../../Atoms/icon";
import { Column, Grid, Row } from "../../Atoms/layout";
import { Segment } from "../../Atoms/segment";
import { CheckBox } from "../../Molecules/check-box";
import { UpdateTaskFolderNameForm } from "../form/update-task-folder-name-form";

interface Props {
  //タスクフォルダー情報
  taskFolderInfo: TaskFolderInfo;
  /** 編集モード */
  editMode: boolean;
  /** フォルダーネーム更新時ハンドラー */
  handleUpdateFolderName: (
    taskFolderId: string,
    prevFolderName: string,
    newFolderName: string
  ) => void;
  /** フォルダー押下時ハンドラー */
  handleClickFolder: (taskFolderInfo: TaskFolderInfo) => void;
  /** 選択済フォルダーIdリスト */
  selectedFolderIdList: string[];
  /** 選択済フォルダーIdリストセット関数 */
  setSelectedFolderIdList: React.Dispatch<React.SetStateAction<string[]>>;
  /** クラスネーム */
  className?: string;
}

const TaskFolderPresenter = React.memo((props: Props) => {
  //hooks
  //フォームコンテキスト
  const { handleSubmit } = useFormContext();

  //state
  //フォルダーネーム編集モード
  const [editFolderName, setEditFolderName] = React.useState(false);
  //選択済み
  const [selected, setSelected] = React.useState(false);

  //effect
  React.useEffect(() => {
    if (!props.editMode) {
      //編集モードが解除されたら、ステートをリセットする。
      setEditFolderName(false);
      setSelected(false);
    }
  }, [props.editMode]);

  //function

  //選択チェックボックスカラム押下時
  const handleSelectCheckBoxColumn = () => {
    //フォルダーネーム編集中の場合、何もしない。
    if (editFolderName) return;

    if (!selected) {
      //未選択の場合
      setSelected(true);
      //選択済フォルダーIdリストに追加
      const tmpList = [...props.selectedFolderIdList];
      tmpList.push(props.taskFolderInfo.taskFolderId);
      props.setSelectedFolderIdList(tmpList);
    } else {
      //選択済みの場合
      setSelected(false);

      //選択済フォルダーIdリストから削除
      const tmpList = props.selectedFolderIdList.filter(
        (id) => id !== props.taskFolderInfo.taskFolderId
      );
      props.setSelectedFolderIdList(tmpList);
    }
  };

  //フォルダーネーム編集ボタン押下時
  const handleEditFolderName = () => {
    setEditFolderName(true);

    //`選択されていた場合、選択を解除
    if (selected) {
      setSelected(false);

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
    props.handleUpdateFolderName(
      props.taskFolderInfo.taskFolderId,
      props.taskFolderInfo.folderName,
      data.updateFolderName
    );

    setEditFolderName(false);
  };

  //フォルダー押下時
  const handleClickFolder = () => {
    props.handleClickFolder(props.taskFolderInfo);
  };

  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={props.editMode ? 3 : 4} className="task-folder-row">
          {!props.editMode && (
            <>
              <Column
                width={1}
                className="task-folder-column"
                onClick={handleClickFolder}
              >
                <Icon iconName="folder outline" size="large" />
              </Column>
              <Column
                width={12}
                className="task-folder-column"
                onClick={handleClickFolder}
              >
                {props.taskFolderInfo.folderName}
              </Column>
              <Column
                width={1}
                className="task-folder-column task-folder-tasks-column"
              >
                {props.taskFolderInfo.taskNumber}
              </Column>
              <Column width={1} className="task-folder-column">
                <Icon iconName="group" size="large" />
              </Column>
            </>
          )}
          {props.editMode && (
            <>
              <Column
                width={1}
                className="task-folder-column"
                onClick={handleSelectCheckBoxColumn}
              >
                <CheckBox
                  selected={selected}
                  className="folder-select-check-box"
                />
              </Column>
              <Column width={12} className="task-folder-column">
                {!editFolderName && <> {props.taskFolderInfo.folderName} </>}
                {editFolderName && (
                  <UpdateTaskFolderNameForm
                    defaultFolderName={props.taskFolderInfo.folderName}
                  />
                )}
              </Column>
              <Column width={2} className="task-folder-column" textAlign="left">
                {!editFolderName && (
                  <Icon
                    iconName="edit outline"
                    onClick={handleEditFolderName}
                    className="edit-task-folder-name-button"
                    size="large"
                  />
                )}
                {editFolderName && (
                  <Icon
                    iconName="check circle outline"
                    onClick={handleSubmit(handleFixeFolderName)}
                    color="blue"
                    className="fixed-task-folder-name-button"
                  />
                )}
              </Column>
            </>
          )}
        </Row>
      </Grid>
    </Segment>
  );
});

export const TaskFolder = styled(TaskFolderPresenter)`
  &&&&& {
    font-size: 1.3rem;
    border: 1px solid;
    //タスクフォルダー行
    .task-folder-row {
      display: table;
      //タスクフォルダー列
      .task-folder-column {
        display: table-cell;
        vertical-align: middle;
        //フォルダー選択チェックボックス
        .folder-select-check-box {
          padding: 0.3rem;
        }
        //タスクフォルダーネーム編集ボタン
        .edit-task-folder-name-button {
          font-size: 1.2em;
        }
        //タスクフォルダーネーム確定ボタン
        .fixed-task-folder-name-button {
          font-size: 1.3em;
          padding-top: 0.2rem;
        }
      }
    }
  }
`;
