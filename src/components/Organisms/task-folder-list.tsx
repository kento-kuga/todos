import React from "react";
import styled from "styled-components";
import { TaskFolder } from "../../common/dto/app";
import { Segment } from "../Atoms/segment";

interface Props {
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolder[];
  /** クラスネーム */
  className?: string;
}

const TaskFolderListPresenter = (props: Props) => {
  return (
    <div className={props.className}>
      {props.taskFolderList.map((folder) => (
        <Segment key={folder.taskFolderId}>{folder.folderName}</Segment>
      ))}
    </div>
  );
};

export const TaskFolderList = styled(TaskFolderListPresenter)``;
