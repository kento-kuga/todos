import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  TaskFolderInfo,
  UpdateTaskFolderFormParams,
} from "../../../common/dto/taskFolder";
import { Icon } from "../../Atoms/icon";
import { Column, Grid, Row } from "../../Atoms/layout";
import { Segment } from "../../Atoms/segment";
import { UpdateTaskFolderNameForm } from "../Form/update-task-folder-name-form";

interface Props {
  //タスクフォルダー情報
  taskFolderInfo: TaskFolderInfo;
  /** クラスネーム */
  className?: string;
  /** 編集モード */
  editMode: boolean;
  /** フォルダーネーム更新時ハンドラー */
  handleUpdateFolderName: (
    taskFolderId: string,
    prevFolderName: string,
    newFolderName?: string
  ) => void;
  /** 選択済フォルダーIdリスト */
  selectedFolderIdList: string[];
  /** 選択済フォルダーIdリストセット関数 */
  setSelectedFolderIdList: React.Dispatch<React.SetStateAction<string[]>>;
}

const TaskFolderPresenter = (props: Props) => {
  //hooks
  //フォームパーツ
  const { control, handleSubmit } = useForm<UpdateTaskFolderFormParams>();

  //state
  //フォルダーネーム編集モード
  const [editFolderName, setEditFolderName] = React.useState(false);
  //選択済み
  const [selected, setSelected] = React.useState(false);

  //effect
  React.useEffect(() => {
    //編集モードが解除されたら、ステートをリセットする。
    setEditFolderName(false);
  }, [props.editMode]);

  //function
  //未選択チェックボック押下時
  const onClickNoSelect = () => {
    setSelected(true);
    //選択済フォルダーIdリストに追加
    const tmpList = [...props.selectedFolderIdList];
    tmpList.push(props.taskFolderInfo.taskFolderId);
    props.setSelectedFolderIdList(tmpList);
  };

  //選択済チェックボック押下時
  const onClickSelected = () => {
    setSelected(false);

    //選択済フォルダーIdリストから削除
    const tmpList = props.selectedFolderIdList.filter(
      (id) => id !== props.taskFolderInfo.taskFolderId
    );
    props.setSelectedFolderIdList(tmpList);
  };

  //フォルダーネーム編集ボタン押下時
  const onClickEditFolderName = () => {
    setEditFolderName(true);
  };

  //フォルダーネーム確定ボタン押下時
  const onClickFixeFolderName = (data: UpdateTaskFolderFormParams) => {
    //フォルダーネーム更新
    props.handleUpdateFolderName(
      props.taskFolderInfo.taskFolderId,
      props.taskFolderInfo.folderName,
      data.folderName
    );

    setEditFolderName(false);
  };

  return (
    <Segment className={props.className}>
      <Grid>
        <Row columns={props.editMode ? 3 : 4} className="task-folder-row">
          {!props.editMode && (
            <>
              <Column width={1} className="task-folder-column">
                <Icon iconName="folder outline" size="large" />
              </Column>
              <Column width={12} className="task-folder-column">
                {props.taskFolderInfo.folderName}
              </Column>
              <Column
                width={1}
                className="task-folder-column task-folder-tasks-column"
              >
                {props.taskFolderInfo.tasks.length}
              </Column>
              <Column width={1} className="task-folder-column">
                <Icon iconName="group" size="large" />
              </Column>
            </>
          )}
          {props.editMode && (
            <>
              <Column width={1} className="task-folder-column">
                {!selected && (
                  <Icon iconName="square outline" onClick={onClickNoSelect} />
                )}
                {selected && (
                  <Icon
                    iconName="check square outline"
                    onClick={onClickSelected}
                  />
                )}
              </Column>
              <Column width={12} className="task-folder-column">
                {!editFolderName && <> {props.taskFolderInfo.folderName} </>}
                {editFolderName && (
                  <UpdateTaskFolderNameForm
                    defaultFolderName={props.taskFolderInfo.folderName}
                    control={control}
                  />
                )}
              </Column>
              <Column width={2} className="task-folder-column" textAlign="left">
                {!editFolderName && (
                  <Icon
                    iconName="edit outline"
                    onClick={onClickEditFolderName}
                    className="edit-task-folder-name-button"
                    size="large"
                  />
                )}
                {editFolderName && (
                  <Icon
                    iconName="check circle outline"
                    onClick={handleSubmit(onClickFixeFolderName)}
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
};

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
