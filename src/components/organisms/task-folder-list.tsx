import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../common/dto/task-folder";
import { TaskFolderController } from "./task-folder-controller";

interface Props {
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
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
  /** クラスネーム */
  className?: string;
}

const TaskFolderListPresenter = React.memo((props: Props) => {
  return (
    <div className={props.className}>
      {props.taskFolderList.map((folder, i) => (
        <div className="task-folder" key={i}>
          <TaskFolderController
            key={folder.taskFolderId}
            taskFolderInfo={folder}
            editMode={props.editMode}
            selectedFolderIdList={props.selectedFolderIdList}
            setSelectedFolderIdList={props.setSelectedFolderIdList}
            editingNameFolderId={props.editingNameFolderId}
            setEditingNameFolderId={props.setEditingNameFolderId}
          />
        </div>
      ))}
    </div>
  );
});

export const TaskFolderList = styled(TaskFolderListPresenter)`
  &&&&& {
    .task-folder {
      margin-bottom: 1rem;
    }
  }
`;
