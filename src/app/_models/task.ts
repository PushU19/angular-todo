import { StatusType } from './enum';

export interface Task {
    id: number;
    username: string;
    email: string;
    text: string;
    status: number;
}

export interface CreateTask {
    username: string;
    email: string;
    text: string;
}

export interface MessageTask {
    tasks: Task[],
    total_task_count: string
}

export interface RequestTaskParams {
    sort_field: string,
    sort_direction: string,
    page: number,
}

export interface ResponseTask {
    status: string;
    message: MessageTask;
}

export interface RequestEditTask {
    id: number,
    text: string,
    status: StatusType
}

export interface TokenError {
    token: string;
}

export interface TaskErrorMessage {
    id?: number,
    username: string,
    email: string,
    text: string,
    status?: number,
    token?: string
}

export interface TaskError {
    status: string;
    message: TaskErrorMessage;
}
