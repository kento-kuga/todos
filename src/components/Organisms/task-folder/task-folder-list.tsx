import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../../common/dto/taskFolder";
import { TaskFolder } from "./task-folder";

interface Props {
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
  /** 編集モード */
  editMode: boolean;
  /** フォルダーネーム更新時ハンドラー */
  handleUpdateFolderName: (
    taskFolderId: string,
    prevFolderName: string,
    newFolderName: string
  ) => void;
  /** 選択済フォルダーIdリスト */
  selectedFolderIdList: string[];
  /** 選択済フォルダーIdリストセット関数 */
  setSelectedFolderIdList: React.Dispatch<React.SetStateAction<string[]>>;
  /** クラスネーム */
  className?: string;
}

const TaskFolderListPresenter = (props: Props) => {
  return (
    <div className={props.className}>
      {props.taskFolderList.map((folder, i) => (
        <div className="task-folder" key={i}>
          <TaskFolder
            key={folder.taskFolderId}
            taskFolderInfo={folder}
            editMode={props.editMode}
            handleUpdateFolderName={props.handleUpdateFolderName}
            selectedFolderIdList={props.selectedFolderIdList}
            setSelectedFolderIdList={props.setSelectedFolderIdList}
          />
        </div>
      ))}
    </div>
  );
};

export const TaskFolderList = styled(TaskFolderListPresenter)`
  &&&&& {
    .task-folder {
      margin-bottom: 1rem;
    }
  }
`;
