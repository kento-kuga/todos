import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../../common/dto/taskFolder";
import { TaskFolder } from "./task-folder";

interface Props {
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
  /** クラスネーム */
  className?: string;
  /** 編集モード */
  editMode?: boolean;
  /** 削除時ハンドラー */
  handleDeleteFolder?: (taskFolderId: string) => void;
  /** フォルダーネーム更新時ハンドラー */
  handleUpdateFolderName?: (
    taskFolderId: string,
    prevFolderName: string,
    newFolderName?: string
  ) => void;
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
            handleDeleteFolder={props.handleDeleteFolder}
            handleUpdateFolderName={props.handleUpdateFolderName}
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
