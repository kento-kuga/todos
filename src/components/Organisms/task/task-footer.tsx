import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../../../common/dto/task";
import { TaskFolderInfo } from "../../../common/dto/taskFolder";
import { useAddTask } from "../../../common/hooks/useAddTask";
import { useTasks } from "../../../common/hooks/useTasks";
import { Grid, Row } from "../../Atoms/layout";
import { AddTaskForm } from "../form/add-task-form";

interface Props {
  /** タスクフォルダー情報 */
  taskFolder: TaskFolderInfo;
  /** クラスネーム */
  className?: string;
}

const TasksFooterPresenter = (props: Props) => {
  //hooks
  //タスク追加Hook
  const addTask = useAddTask();

  //state
  //タスクリスト
  const [tasks, setTasks] = useTasks();

  //function
  //タスク追加時ハンドラー
  const handleAddTask = React.useCallback(
    (createTaskName: string) => {
      //タスクリストが取得されていなければ何もしない
      if (!tasks) return;

      //ローカルタスクリスト情報だけ先に更新
      const newTasks = [...tasks];
      newTasks.push({ name: createTaskName } as TaskInfo);
      setTasks(newTasks);

      //タスクリストに新しいタスクを追加し、再取得
      addTask(createTaskName, props.taskFolder.taskFolderId);
    },
    [tasks, setTasks, addTask, props.taskFolder.taskFolderId]
  );

  return (
    <footer className={props.className}>
      <Grid>
        <Row textAlign="center">
          <AddTaskForm handleSubmit={handleAddTask} />
        </Row>
      </Grid>
    </footer>
  );
};

export const TasksFooter = styled(TasksFooterPresenter)``;
