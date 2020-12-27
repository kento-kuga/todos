import { UpdateTaskReq } from "../../common/dto/task";
import { Listener } from "../../core/listener";

export interface TaskRepositoryInterface {
  /**
   * タスク追加
   * @param createTaskName 作成するタスク名
   * @param taskFolderId タスクフォルダID
   * @param listener リスナ~
   */
  add: (
    createTaskName: string,
    taskFolderId: string,
    listener?: Listener
  ) => void;

  /**
   * タスク更新
   * @param taskId タスクID
   * @param updateTaskParam タスク更新パラメーター
   * @param listener リスナー
   */
  update: (
    taskId: string,
    updateTaskParam: UpdateTaskReq,
    listener?: Listener
  ) => void;
}
