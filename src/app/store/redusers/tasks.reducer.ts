import { CreateTask, Task, TaskError, TaskErrorMessage } from '../../_models/task';
import { SortDirectionType, SortFieldType } from 'src/app/_models/enum';
import * as TaskActions from '../actions/tasks.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
    tasks: { [key: string]: Task };

    serverMessage: TaskErrorMessage;
    serverError: string;
    loading: boolean;
    loaded: boolean;

    sort_field: SortFieldType;
    sort_direction: SortDirectionType;
    page: number;
    total_task_count: string;
}

export const initialState: State = {
    tasks: {},

    serverMessage: {} as TaskErrorMessage,
    serverError: '',
    loading: false,
    loaded: false,

    sort_field: SortFieldType.id,
    sort_direction: SortDirectionType.asc,
    page: 0,
    total_task_count: '0',
};

const reducers = createReducer(
    initialState,
    on(TaskActions.GetTasksRequest, (state) => ({
        ...state,
        loading: true,
    })),
    on(TaskActions.GetTasksSuccess, (state, payload) => {
        const tasks = payload.messageTask.tasks.reduce((memo, task) => {
            memo[task.id] = task;
            return memo;
        }, {} as { [key: string]: Task });
        return {
            ...state,
            tasks,
            total_task_count: payload.messageTask.total_task_count,
            loading: false,
            loaded: true,
            serverError: '',
        };
    }),
    on(TaskActions.GetTasksFailure, (state, payload) => {
        const error = payload.serverMessage;
        return {
            ...state,
            loading: false,
            loaded: true,
            serverMessage: error,
        };
    }),
    on(TaskActions.PostCreateTaskFailure, (state, { serverMessage }) => {
        return {
            ...state,
            loading: true,
            serverMessage,
            serverError: '',
        };
    }),
    on(TaskActions.PostEditTaskFailure, (state, { serverMessage }) => {
        return {
            ...state,
            loading: true,
            serverMessage,
            serverError: '',
        };
    }),
    on(TaskActions.SetTasksPage, (state, { page }) => {
        return {
            ...state,
            page,
        };
    }),
    on(TaskActions.SetTasksSortField, (state, { sort_field }) => {
        return {
            ...state,
            sort_field,
        };
    }),
    on(TaskActions.SetTasksSortDirection, (state, { sort_direction }) => {
        return {
            ...state,
            sort_direction,
        };
    })
);

export function taskReducers(state: State | undefined, action: Action) {
    return reducers(state, action);
}
