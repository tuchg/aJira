export type Raw = string | number;

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface Kanban {
  id: number;
  name: string;
  projectId: number;
}

export interface Task {
  id: number;
  name: string;
  /** 经办人 */
  processorId: number;
  projectId: number;
  /** 任务组 */
  epicId: number;
  kanbanId: number;
  /** bug or task */
  typeId: number;
  note: string;
}

export interface TaskType {
  id: number;
  name: string;
}

export interface Epic {
  id: number;
  name: string;
  projectId: number;
  /** 开始时间*/
  start: number;
  /** 结束时间*/
  end: number;
}
