import React from "react";
import styled from "styled-components";
import { TaskFolderInfo } from "../../common/dto/task-folder";
import { UserInfo } from "../../common/dto/user";
import { useToggle } from "../../common/hooks/common/toggle-hook";
import { UseFoldersHandler } from "../../common/hooks/folders/folders-handler-hook";
import { CreateTaskFolderModal } from "../molecules/modal/create-task-folder-modal";
import { FoldersHeader } from "../organisms/folders-header";
import { FoldersMain } from "../organisms/folders-main";

interface Props {
  /** ユーザー情報 */
  userInfo: UserInfo | null;
  /** タスクフォルダーリスト */
  taskFolderList: TaskFolderInfo[];
  /** クラスネーム */
  className?: string;
}

const FoldersTemplatePresenter = React.memo((props: Props) => {
  //state
  //タスクフォルダー作成モーダルフラグ
  const [
    createFolderOpen,
    ,
    turnOnCreateFolder,
    turnOffCreateFolder,
  ] = useToggle();

  //function
  //フォルダーリストハンドラー
  const { handleCreateFolder } = UseFoldersHandler();

  return (
    <div className={props.className}>
      <FoldersHeader className="folders-header" />
      <FoldersMain
        taskFolderList={props.taskFolderList}
        handleClickAddFolderButton={turnOnCreateFolder}
      />
      <CreateTaskFolderModal
        open={createFolderOpen}
        handleClose={turnOffCreateFolder}
        handleCreateFolder={handleCreateFolder}
      />
    </div>
  );
});

export const FoldersTemplate = styled(FoldersTemplatePresenter)`
  &&&&& {
    .folders-header {
      margin-bottom: 1rem;
    }
  }
`;
