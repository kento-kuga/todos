import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import {
  FoldersFormParams,
  TaskFolderInfo,
} from "../../../common/dto/task-folder";
import { Row, Column, Grid } from "../../atoms/layout";
import { Segment } from "../../atoms/segment";
import { EditAndFixedButton } from "../button/edit-and-fixed-button";
import { CheckBox } from "../check-box";
import { UpdateTaskFolderNameForm } from "../form/update-task-folder-name-form";

interface Props {
  /** タスクフォルダー情報 */
  taskFolderInfo: TaskFolderInfo;
  /** フォルダーネーム編集モード */
  editFolderNameMode: boolean;
  /** フォルダーネーム編集ボタン非活性フラグ */
  disableEditFolderName: boolean;
  /** フォルダー選択中フラグ */
  selected: boolean;
  /** 選択チェックボックスカラム押下時 */
  handleSelectCheckBoxColumn: () => void;
  /** フォルダーネーム確定ボタン押下時 */
  handleFixeFolderName: (data: FoldersFormParams) => void;
  /** フォルダーネーム編集ボタン押下時 */
  handleEditFolderName: () => void;

  /** フォルダーネーム更新時ハンドラー */
  handleUpdateFolderName: (
    taskFolderId: string,
    prevFolderName: string,
    newFolderName: string
  ) => void;
  /** クラスネーム */
  className?: string;
}

const EditingNameTaskFolderPresenter = (props: Props) => {
  //hooks
  //フォームコンテキスト
  const { handleSubmit } = useFormContext();

  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={3} className="task-folder-row">
          <Column
            width={1}
            className="task-folder-column"
            onClick={props.handleSelectCheckBoxColumn}
          >
            <CheckBox
              selected={props.selected}
              className="folder-select-check-box"
            />
          </Column>
          <Column width={12} className="task-folder-column">
            {props.editFolderNameMode ? (
              <UpdateTaskFolderNameForm
                defaultFolderName={props.taskFolderInfo.folderName}
              />
            ) : (
              <> {props.taskFolderInfo.folderName} </>
            )}
          </Column>
          <Column width={2} className="task-folder-column" textAlign="left">
            <EditAndFixedButton
              isEdit={props.editFolderNameMode}
              disableEditFolderName={props.disableEditFolderName}
              handleClickEditButton={props.handleEditFolderName}
              handleClickFixedButton={handleSubmit(props.handleFixeFolderName)}
            />
          </Column>
        </Row>
      </Grid>
    </Segment>
  );
};

export const EditingNameTaskFolder = styled(EditingNameTaskFolderPresenter)`
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
      }
    }
  }
`;
