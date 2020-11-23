import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TaskFolder, UserInfo } from "../../common/dto/app";
import { Grid, Row } from "../Atoms/layout";
import { TaskFolderList } from "../Organisms/task-folder-list";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolder[];
  /** クラスネーム */
  className?: string;
}

const FoldersTemplatePresenter = (props: Props) => {
  return (
    <Grid className={props.className}>
      <Row>{props.userInfo.name + "さんのフォルダー"}</Row>
      <Row>
        <TaskFolderList
          taskFolderList={props.taskFolderList}
          className="task-folder-list"
        />
      </Row>
      <Row>
        <Link to="/">戻る</Link>
      </Row>
    </Grid>
  );
};

export const FoldersTemplate = styled(FoldersTemplatePresenter)`
  &&&&& {
  }
`;
