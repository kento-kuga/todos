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
  handleClickDelete?: (taskFolderId: string) => void;
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
            handleClickDelete={props.handleClickDelete}
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
