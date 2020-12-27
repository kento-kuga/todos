import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { UserInfo } from "../common/dto/user";
import { FoldersTemplate } from "../components/templates/folders-template";
import {
  CreateTaskFolderFormParams,
  TaskFolderInfo,
} from "../common/dto/task-folder";
import userEvent from "@testing-library/user-event";
import { useUpdateFolderName } from "../common/hooks/folders/update-folder-name-hook";
import { FormProvider, useForm } from "react-hook-form";

//テストデータ
//ユーザー情報
const userInfo = new UserInfo();
userInfo.name = "テストユーザー";
userInfo.userId = "testUserId";
userInfo.taskFolderIdList = ["testFolderId1", "testFolderId2"];

//タスクフォルダー
const taskFolder1 = new TaskFolderInfo();
taskFolder1.folderName = "テストフォルダー1";
taskFolder1.taskFolderId = "testFolderId1";
taskFolder1.members = [userInfo];

const taskFolder2 = new TaskFolderInfo();
taskFolder1.folderName = "テストフォルダー2";
taskFolder1.taskFolderId = "testFolderId2";
taskFolder1.members = [userInfo];

//タスクフォルダーリスト
const taskFolderList = [] as TaskFolderInfo[];
taskFolderList.push(taskFolder1);
taskFolderList.push(taskFolder2);

//テスト用コンポーネント
interface WrapFolderTemplateProps {
  /** フォルダー作成時ハンドラー */
  handleCreateFolder: (folderName: string) => void;
  /** フォルダー削除時ハンドラー */
  handleDeleteFolders: (taskFolderId: string[]) => void;
  /** フォルダーネーム更新時ハンドラー */
  handleUpdateFolderName: (
    taskFolderId: string,
    prevFolderName: string,
    newFolderName?: string
  ) => void;
}
const WrapFolderTemplate = (props: WrapFolderTemplateProps) => {
  //hooks
  //フォームパーツ
  const methods = useForm<CreateTaskFolderFormParams>();
  //state
  const [editMode, setEditMode] = React.useState(false);
  const [createFolderOpen, setCreateFolderOpen] = React.useState(false);
  const [selectedFolderIdList, setSelectedFolderIdList] = React.useState(
    [] as string[]
  );

  return (
    <FormProvider {...methods}>
      <FoldersTemplate
        userInfo={userInfo}
        taskFolderList={taskFolderList}
        editMode={editMode}
        setEditMode={setEditMode}
        createFolderOpen={createFolderOpen}
        setCreateFolderOpen={setCreateFolderOpen}
        handleCreateFolder={props.handleCreateFolder}
        handleDeleteFolders={props.handleDeleteFolders}
        handleUpdateFolderName={props.handleUpdateFolderName}
        selectedFolderIdList={selectedFolderIdList}
        setSelectedFolderIdList={setSelectedFolderIdList}
      />
    </FormProvider>
  );
};

//function
const handleCreateFolder = jest.fn();
const handleDeleteFolders = jest.fn();
const handleUpdateFolderName = jest.fn();

beforeEach(() => {
  render(
    <WrapFolderTemplate
      handleCreateFolder={handleCreateFolder}
      handleDeleteFolders={handleDeleteFolders}
      handleUpdateFolderName={handleUpdateFolderName}
    />
  );
});

describe("Folder作成テスト", () => {
  it("フォルダー作成テスト", async () => {
    // screen.debug();

    //初期表示時にモーダルは非表示になっているか
    expect(screen.queryByTestId("create-task-folder-modal")).toBeNull();

    //フォルダー作成ボタン押下
    userEvent.click(screen.getByTestId("folders-add-folder-button"));

    //モーダルが表示されたか
    screen.getByTestId("create-task-folder-modal");

    //フォルダー名入力
    userEvent.type(
      screen.getByTestId("create-task-folder-form-input"),
      "フォルダー作成テストフォルダー名"
    );

    //フォルダー作成ボタン押下
    userEvent.click(
      screen.getByTestId("create-task-folder-form-submit-button")
    );

    await waitFor(() => expect(handleCreateFolder).toHaveBeenCalledTimes(0));
  });

  it("フォルダー削除テスト", async () => {
    // screen.debug();
    const settingButton = screen.getByTestId("folders-setting-button");
    const tmp = settingButton.querySelector(".blue");
  });
});
