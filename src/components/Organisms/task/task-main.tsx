import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../../common/dto/task";
import { TaskFolderInfo } from "../../../common/dto/taskFolder";
import { useDeleteTasks } from "../../../common/hooks/useDeleteTasks";
import { useTasks } from "../../../common/hooks/useTasks";
import { useUpdateTask } from "../../../common/hooks/useUpdateTask";
import { Accordion } from "../../Atoms/accordion";
import { Icon } from "../../Atoms/icon";
import { Grid, Row } from "../../Atoms/layout";
import { TaskList } from "../../Molecules/task-list";

interface Props {
  /** タスクフォルダー情報 */
  taskFolder: TaskFolderInfo;
  /** クラスネーム */
  className?: string;
}

const TaskMainPresenter = (props: Props) => {
  //hooks
  //タスクリスト削除フック
  const deleteTasks = useDeleteTasks();
  //タスク更新Hook
  const updateTask = useUpdateTask();

  //state
  //タスクリスト
  const [tasks, setTasks] = useTasks();
  //未完了タスク
  const [unCompletedTasks, setUnCompletedTasks] = React.useState(
    [] as TaskInfo[]
  );
  //完了済タスク
  const [completedTasks, setCompletedTasks] = React.useState([] as TaskInfo[]);

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

  //function
  //タスク完了状態変更時ハンドラ-
  const handleChangeTaskCompleted = React.useCallback(
    (task: TaskInfo, completed: boolean) => {
      //タスクリストが取得されていなければ何もしない
      if (!tasks) return;

      //渡された添字のタスクの選択状態を変更し、タスクリストを更新する。
      const tmpTasks = [...tasks];
      //タスクIDで対象のタスクを抽出
      const tmpTask = tmpTasks.find(
        (tmpTask) => tmpTask.taskId === task.taskId
      );
      if (tmpTask) {
        //対象のタスクが存在する場合、対象タスクの完了状態を更新
        tmpTask.completed = completed;
        setTasks(tmpTasks);

        //DBのタスクを更新
        updateTask(tmpTask, task.taskFolderId);
      }
    },
    [setTasks, tasks, updateTask]
  );

  //完了済タスク削除ボタン押下時ハンドラ
  const handleClickCompletedTaskDelete = React.useCallback(() => {
    if (completedTasks.length > 0) {
      //完了済タスクが存在するなら、タスクを削除する。
      deleteTasks(completedTasks, props.taskFolder.taskFolderId);
    }
  }, [completedTasks, deleteTasks, props.taskFolder.taskFolderId]);

  return (
    <>
      <main className={props.className}>
        <Grid container>
          <Row />
          <div className="task-folder-name">{props.taskFolder.folderName}</div>
          <Row>
            <TaskList
              tasks={unCompletedTasks}
              handleChangeTaskCompleted={handleChangeTaskCompleted}
            />
          </Row>
          <Row>
            <Accordion title="完了したタスク">
              <div className="completed-task-delete">
                <Icon
                  iconName="trash"
                  size="large"
                  onClick={handleClickCompletedTaskDelete}
                />
              </div>
              <TaskList
                tasks={completedTasks}
                handleChangeTaskCompleted={handleChangeTaskCompleted}
              />
            </Accordion>
          </Row>
        </Grid>
      </main>
    </>
  );
};

export const TaskMain = styled(TaskMainPresenter)`
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
