import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../common/dto/task";
import { TaskFolderInfo } from "../../common/dto/task-folder";
import { useTaskFolder } from "../../common/hooks/tasks/task-folder-hook";
import { useTasks } from "../../common/hooks/tasks/tasks-hook";
import { useTasksHandler } from "../../common/hooks/tasks/tasks-handler-hook";
import { Accordion } from "../atoms/accordion";
import { Grid, Row } from "../atoms/layout";
import { TaskList } from "./task-list";
import { TrashButton } from "../molecules/button/trash-button";

interface ContainerProps {
  /** クラスネーム */
  className?: string;
}

const TaskMainContainer = (props: ContainerProps) => {
  //state
  //タスクフォルダー
  const [taskFolder] = useTaskFolder();
  //タスクリスト
  const [tasks] = useTasks(taskFolder);
  //未完了タスク
  const [unCompletedTasks, setUnCompletedTasks] = React.useState(
    [] as TaskInfo[]
  );
  //完了済タスク
  const [completedTasks, setCompletedTasks] = React.useState([] as TaskInfo[]);

  //function
  //タスクリストハンドラー
  const { handleClickCompletedTaskDelete } = useTasksHandler();

  //effect
  React.useEffect(() => {
    //タスクリストが取得されていなければ何もしない
    if (!tasks) return;

    //未完了のタスクろ完了済のタスクを分ける。
    const tmpUnCompletedList = [] as TaskInfo[];
    const tmpCompletedList = [] as TaskInfo[];

    tasks.forEach((task) => {
      if (!task.completed) {
        //未実施のタスク
        tmpUnCompletedList.push(task);
      } else {
        //実施済のタスク
        tmpCompletedList.push(task);
      }
    });

    setUnCompletedTasks(tmpUnCompletedList);
    setCompletedTasks(tmpCompletedList);
  }, [tasks]);

  return (
    <TaskMainPresenter
      taskFolder={taskFolder || new TaskFolderInfo()}
      unCompletedTasks={unCompletedTasks}
      completedTasks={completedTasks}
      handleClickCompletedTaskDelete={handleClickCompletedTaskDelete}
      className={props.className}
    />
  );
};

interface PresenterProps {
  /** タスクフォルダー情報 */
  taskFolder: TaskFolderInfo;
  /** 未完了タスクリスト */
  unCompletedTasks: TaskInfo[];
  /** 完了済タスクリスト */
  completedTasks: TaskInfo[];
  /** 完了済タスク削除ハンドラー */
  handleClickCompletedTaskDelete: (completedTasks: TaskInfo[]) => void;
  /** クラスネーム */
  className?: string;
}

const TaskMainPresenter = (props: PresenterProps) => {
  return (
    <>
      <main className={props.className}>
        <Grid container>
          <Row />
          <div className="task-folder-name">{props.taskFolder.folderName}</div>
          <Row className="uncompleted-task-list">
            <TaskList tasks={props.unCompletedTasks} />
          </Row>
          {props.completedTasks.length > 0 && (
            <Row className="completed-task-list-row">
              <Accordion
                title="完了したタスク"
                getBeforeDisplayOptionContent={
                  <div className="completed-task-count">
                    {props.completedTasks.length}
                  </div>
                }
                getAfterDisplayOptionContent={
                  <TrashButton
                    handleClick={() =>
                      props.handleClickCompletedTaskDelete(props.completedTasks)
                    }
                    className="completed-task-delete-button"
                  />
                }
              >
                <TaskList tasks={props.completedTasks} />
              </Accordion>
            </Row>
          )}
        </Grid>
      </main>
    </>
  );
};

export const TaskMain = styled(TaskMainContainer)<ContainerProps>`
  &&&&& {
    //タスクフォルダー名
    .task-folder-name {
      font-size: 2rem;
      font-weight: 600;
    }
    //未完了タスク行
    .uncompleted-task-list {
      padding-bottom: 0rem;
    }
    //完了済タスク行
    .completed-task-list-row {
      padding: 0;
      //完了済タスクカウンター
      .completed-task-count {
        font-size: 1.1rem;
        padding-right: 0.5rem;
      }
      //完了済タスク削除ボタン
      .completed-task-delete-button {
        font-size: 1.1rem;
      }
    }
  }
`;
