import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../../common/dto/task";
import { TaskFolderInfo } from "../../../common/dto/task-folder";
import { useTaskFolder } from "../../../common/hooks/tasks/task-folder-hook";
import { useTasks } from "../../../common/hooks/tasks/tasks-hook";
import { useTasksHandler } from "../../../common/hooks/tasks/tasks-handler-hook";
import { Accordion } from "../../Atoms/accordion";
import { Icon } from "../../Atoms/icon";
import { Grid, Row } from "../../Atoms/layout";
import { TaskList } from "../../Molecules/task-list";

interface ContainerProps {
  /** クラスネーム */
  className?: string;
}

const TaskMainContainer = (props: ContainerProps) => {
  //state
  //タスクリスト
  const [tasks] = useTasks();
  //タスクフォルダー
  const [taskFolder] = useTaskFolder();
  //未完了タスク
  const [unCompletedTasks, setUnCompletedTasks] = React.useState(
    [] as TaskInfo[]
  );
  //完了済タスク
  const [completedTasks, setCompletedTasks] = React.useState([] as TaskInfo[]);

  //function
  //タスクリストハンドラー
  const {
    handleChangeTaskCompleted,
    handleClickCompletedTaskDelete,
  } = useTasksHandler();

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
      handleChangeTaskCompleted={handleChangeTaskCompleted}
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
  /** タスク完了状態変更ハンドラー */
  handleChangeTaskCompleted: (task: TaskInfo, completed: boolean) => void;
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
          <Row>
            <TaskList
              tasks={props.unCompletedTasks}
              handleChangeTaskCompleted={props.handleChangeTaskCompleted}
            />
          </Row>
          <Row>
            <Accordion title="完了したタスク">
              <div className="completed-task-delete">
                <Icon
                  iconName="trash"
                  size="large"
                  onClick={() =>
                    props.handleClickCompletedTaskDelete(props.completedTasks)
                  }
                />
              </div>
              <TaskList
                tasks={props.completedTasks}
                handleChangeTaskCompleted={props.handleChangeTaskCompleted}
              />
            </Accordion>
          </Row>
        </Grid>
      </main>
    </>
  );
};

export const TaskMain = styled(TaskMainContainer)<ContainerProps>`
  &&&&& {
    .task-folder-name {
      font-size: 2rem;
      font-weight: 600;
    }
    .completed-task-delete {
      text-align: right;
    }
  }
`;
