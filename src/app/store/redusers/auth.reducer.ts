import * as AuthActions from '../actions/auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/_models/auth';

export interface State {
    serverError: string,
    serverMessage: User;
    loading: boolean;
    loaded: boolean;
    isAuth: boolean;
}

export const initialState: State = {
    serverError: '',
    serverMessage: { username: '', password: '' },
    loading: false,
    loaded: false,
    isAuth: false,
};

const reducers = createReducer(
    initialState,
    on(AuthActions.LoginUserSuccess, (state) => {
        return {
            ...state,
            isAuth: true,
            loading: false,
            loaded: true,
            serverError: ''
        };
    }),
    on(AuthActions.LoginUserFailure, (state, payload) => {
        const error = payload.serverMessage;
        return {
            ...state,
            loading: false,
            loaded: true,
            serverMessage: error,
            isAuth: false,
        };
    }),
    on(AuthActions.LoginServerFailure, (state, payload) => {
        const error = payload.serverError;
        return {
            ...state,
            loading: false,
            loaded: true,
            serverError: error,
            isAuth: false,
        };
    }),

    on(AuthActions.LoginUserRequest, (state) => {
        return {
            ...state,
            loading: true,
            serverMessage: initialState.serverMessage,
            serverError: ''
        };
    }),

    on(AuthActions.LogoutUser, (state) => {
        return {
            ...state,
            isAuth: false,
        };
    })
);

export function authReducers(state: State | undefined, action: Action) {
    return reducers(state, action);
}
