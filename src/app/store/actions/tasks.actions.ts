import { createAction, props } from '@ngrx/store';
import { SortDirectionType, SortFieldType, StatusType, } from 'src/app/_models/enum';
import { CreateTask, MessageTask, TaskErrorMessage, TokenError } from 'src/app/_models/task';

export const GetTasksRequest = createAction('[Task] Get Tasks');
export const GetTasksSuccess = createAction(
    '[Task] Get Tasks Success',
    props<{ messageTask: MessageTask }>()
);
export const GetTasksFailure = createAction(
    '[Task] Get Tasks Failure',
    props<{ serverMessage: TaskErrorMessage }>()
);

export const GetServerFailure = createAction(
    '[Task] Get Tasks Server Failure',
    props<{ serverError: string }>()
);

export const PostCreateTaskRequest = createAction(
    '[Task] Create Task',
    props<{ username: string; email: string; text: string }>()
);
export const PostCreateTaskSuccess = createAction('[Task] Create Task Success');
export const PostCreateTaskFailure = createAction(
    '[Task] Create Task Failure',
    props<{ serverMessage: TaskErrorMessage }>()
);

export const PostEditTaskRequest = createAction(
    '[Task] Edit Task',
    props<{ text: string; status: StatusType; id: number }>()
);
export const PostEditTaskSuccess = createAction('[Task] Edit Task Success');
export const PostEditTaskFailure = createAction(
    '[Task] Edit Task Failure',
    props<{ serverMessage: TaskErrorMessage }>()
);

export const SetTasksPage = createAction(
    '[Taks] Set page',
    props<{ page: number }>()
);
export const SetTasksSortField = createAction(
    '[Taks] Set sort field',
    props<{ sort_field: SortFieldType }>()
);
export const SetTasksSortDirection = createAction(
    '[Taks] Set sort direction',
    props<{ sort_direction: SortDirectionType }>()
);

export const SetTastListParams = createAction(
    '[Task] Set list params',
    props<{
        page?: number;
        sort_field?: SortFieldType;
        sort_direction?: SortDirectionType;
    }>()
);
