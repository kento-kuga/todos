import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../common/dto/taskFolder";
import { UserInfo } from "../../common/dto/user";
import { Icon, IconGroup } from "../Atoms/icon";
import { Grid, Row } from "../Atoms/layout";
import { CreateTaskFolderModal } from "../Organisms/create-task-modal/create-task-folder-modal";
import { FoldersHeader } from "../Organisms/header/folders-header";
import { TaskFolderList } from "../Organisms/task-folder/task-folder-list";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
  /** クラスネーム */
  className?: string;
  /** 編集モード */
  editMode: boolean;
  /** 編集モード選択ハンドラー */
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  /** タスクフォルダー作成モーダルフラグ */
  createFolderOpen: boolean;
  /** タスクフォルダー作成モーダルフラグセット関数 */
  setCreateFolderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** フォルダー作成時ハンドラー */
  handleCreateFolder: (createFolderName: string) => void;
  /** フォルダー削除時ハンドラー */
  handleDeleteFolders: () => void;
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
}

const FoldersTemplatePresenter = React.memo((props: Props) => {
  //function
  //設定ボタン押下時ハンドラ
  const handleClickSettingButton = React.useCallback(() => {
    props.setEditMode((state) => !state);
  }, [props]);

  //フォルダー作成ボタン押下時ハンドラ
  const handleClickCreateFolderButton = React.useCallback(() => {
    props.setCreateFolderOpen(true);
  }, [props]);

  //フォルダー作成モーダルクローズハンドラ
  const handleCloseCreateFolderModal = React.useCallback(() => {
    props.setCreateFolderOpen(false);
  }, [props]);

  return (
    <div className={props.className}>
      <header className="folders-header">
        <FoldersHeader />
      </header>
      <main className="folders-main">
        <Grid container>
          <Row className="setting-row">
            <div className="setting-button">
              <Icon
                size="large"
                iconName="setting"
                color={props.editMode ? "blue" : "black"}
                onClick={handleClickSettingButton}
                testid="folders-setting-button"
              />
            </div>
          </Row>
          <Row className="folder-list-row">
            <TaskFolderList
              taskFolderList={props.taskFolderList}
              className="task-folder-list"
              editMode={props.editMode}
              handleUpdateFolderName={props.handleUpdateFolderName}
              handleClickFolder={props.handleClickFolder}
              selectedFolderIdList={props.selectedFolderIdList}
              setSelectedFolderIdList={props.setSelectedFolderIdList}
            />
          </Row>
          <Row textAlign="right" className="add-folder-row">
            <div className="add-folder-button">
              {!props.editMode && (
                <IconGroup
                  size="big"
                  onClick={handleClickCreateFolderButton}
                  testid="folders-add-folder-button"
                >
                  <Icon iconName="folder outline" />
                  <Icon iconName="add" corner="top right" inverted />
                </IconGroup>
              )}
              {props.editMode && (
                <Icon
                  iconName="trash"
                  size="big"
                  disable={
                    props.selectedFolderIdList.length === 0 ? true : false
                  }
                  onClick={props.handleDeleteFolders}
                  testid="folders-delete-folder-button"
                />
              )}
            </div>
          </Row>
        </Grid>
      </main>
      <CreateTaskFolderModal
        open={props.createFolderOpen}
        handleClose={handleCloseCreateFolderModal}
        handleCreateFolder={props.handleCreateFolder}
      />
    </div>
  );
});

export const FoldersTemplate = styled(FoldersTemplatePresenter)`
  &&&&& {
    .folders-header {
      margin-bottom: 1rem;
    }
    .folders-main {
      .setting-row {
        padding-top: 0.5rem;
        padding-bottom: 0;
        .setting-button {
          font-size: 1.2rem;
          text-align: right;
        }
      }
      .folder-list-row {
        padding-bottom: 0rem;
      }
      .add-folder-row {
        padding-top: 0rem;
        .add-folder-button {
          padding-right: 1rem;
        }
      }
    }
  }
`;
