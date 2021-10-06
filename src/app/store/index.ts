import { ActionReducerMap } from '@ngrx/store';
import * as Task from './redusers/tasks.reducer';
import * as Auth from './redusers/auth.reducer';

export interface State {
    tasks: Task.State;
    auth: Auth.State;
}

export const initialAppState: State = {
    tasks: Task.initialState,
    auth: Auth.initialState
};

export const reducers: ActionReducerMap<State> = {
    tasks: Task.taskReducers,
    auth: Auth.authReducers
};
