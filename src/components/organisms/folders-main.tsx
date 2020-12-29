import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../common/dto/task-folder";
import { useToggle } from "../../common/hooks/common/toggle-hook";
import { UseFoldersHandler } from "../../common/hooks/folders/folders-handler-hook";
import { Icon, IconGroup } from "../atoms/icon";
import { Grid, Row } from "../atoms/layout";
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
        <Row className="setting-row">
          <div className="setting-button">
            <Icon
              size="large"
              iconName="setting"
              color={editMode ? "blue" : "black"}
              onClick={toggleEditMode}
            />
          </div>
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
              <IconGroup size="big" onClick={props.handleClickAddFolderButton}>
                <Icon iconName="folder outline" />
                <Icon iconName="add" corner="top right" inverted />
              </IconGroup>
            )}
            {editMode && (
              <Icon
                iconName="trash"
                size="big"
                disable={selectedFolderIdList.length === 0 ? true : false}
                onClick={handleClickDelete}
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
