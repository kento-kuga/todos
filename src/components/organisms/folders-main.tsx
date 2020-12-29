import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../common/dto/task-folder";
import { useToggle } from "../../common/hooks/common/toggle-hook";
import { UseFoldersHandler } from "../../common/hooks/folders/folders-handler-hook";
import { Icon } from "../atoms/icon";
import { Grid, Row } from "../atoms/layout";
import { AddFolderButton } from "../molecules/button/add-folder-button";
import { SettingButton } from "../molecules/button/setting-button";
import { TrashButton } from "../molecules/button/trash-button";
import { TaskFolderList } from "./task-folder-list";

interface Props {
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
  /** フォルダー追加ボタン押下時ハンドラー */
  handleClickAddFolderButton: () => void;
  /** クラスネーム */
  className?: string;
}

const FoldersMainPresenter = (props: Props) => {
  //編集モードフラグ
  const [editMode, toggleEditMode, , turnOffEditMode] = useToggle();
  //選択済フォルダーIdリスト
  const [selectedFolderIdList, setSelectedFolderIdList] = React.useState(
    [] as string[]
  );

  //function
  //フォルダーリストハンドラー
  const { handleDeleteFolders } = UseFoldersHandler();

  //削除アイコン押下時ハンドラー
  const handleClickDelete = React.useCallback(() => {
    //フォルダー削除
    handleDeleteFolders(selectedFolderIdList);
    //選択フォルダーリスト初期化
    setSelectedFolderIdList([]);
    //編集モード解除
    turnOffEditMode();
  }, [handleDeleteFolders, selectedFolderIdList, turnOffEditMode]);

  return (
    <main className="folders-main">
      <Grid container>
        <Row className="setting-row" textAlign="right">
          <SettingButton isActive={editMode} handleClick={toggleEditMode} />
        </Row>
        <Row className="folder-list-row">
          <TaskFolderList
            taskFolderList={props.taskFolderList}
            className="task-folder-list"
            editMode={editMode}
            selectedFolderIdList={selectedFolderIdList}
            setSelectedFolderIdList={setSelectedFolderIdList}
          />
        </Row>
        <Row textAlign="right" className="add-folder-row">
          <div className="add-folder-button">
            {!editMode && (
              <AddFolderButton handleClick={props.handleClickAddFolderButton} />
            )}
            {editMode && (
              <TrashButton
                isDisable={selectedFolderIdList.length === 0 ? true : false}
                handleClick={handleClickDelete}
              />
            )}
          </div>
        </Row>
      </Grid>
    </main>
  );
};

export const FoldersMain = styled(FoldersMainPresenter)`
  &&&&& {
    .folders-main {
      //設定ボタン行
      .setting-row {
        padding-top: 0.5rem;
        padding-bottom: 0;
      }
      //フォルダーリスト行
      .folder-list-row {
        padding-bottom: 0rem;
      }
      //フォルダー追加ボタン行
      .add-folder-row {
        padding-top: 0rem;
        //フォルダー追加ボタン
        .add-folder-button {
          padding-right: 1rem;
        }
      }
    }
  }
`;
