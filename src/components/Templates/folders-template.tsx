import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TaskFolderInfo, UserInfo } from "../../common/dto/app";
import { Icon, IconGroup } from "../Atoms/icon";
import { Grid, Row } from "../Atoms/layout";
import { TaskFolderList } from "../Organisms/task-folder/task-folder-list";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo;
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
  /** クラスネーム */
  className?: string;
}

const FoldersTemplatePresenter = (props: Props) => {
  return (
    <Grid className={props.className}>
      <Row className="header-row">
        <div className="setting-button">
          <Icon size="large" iconName="setting" />
        </div>
      </Row>
      <Row className="folder-list-row">
        <TaskFolderList
          taskFolderList={props.taskFolderList}
          className="task-folder-list"
        />
      </Row>
      <Row textAlign="right" className="add-folder-row">
        <div className="add-folder-button">
          <IconGroup size="big">
            <Icon iconName="folder outline" />
            <Icon iconName="add" corner="top right" inverted />
          </IconGroup>
        </div>
      </Row>
    </Grid>
  );
};

export const FoldersTemplate = styled(FoldersTemplatePresenter)`
  &&&&& {
    .header-row {
      padding-bottom: 0;
      .setting-button {
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
`;
