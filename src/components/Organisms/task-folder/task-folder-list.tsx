import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../../common/dto/app";
import { Icon } from "../../Atoms/icon";
import { TaskFolder } from "./task-folder";

interface Props {
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
  /** クラスネーム */
  className?: string;
}

const TaskFolderListPresenter = (props: Props) => {
  return (
    <div className={props.className}>
      {props.taskFolderList.map((folder) => (
        <>
          <div className="task-folder">
            <TaskFolder key={folder.taskFolderId} taskFolderInfo={folder} />
          </div>
        </>
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
