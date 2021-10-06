import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../redusers/auth.reducer';

export const state = createFeatureSelector<State>('auth');

export const getServerMessageUsername = createSelector(state, (state) => {
    return state.serverMessage.username;
});
export const getServerMessagePassword = createSelector(state, (state) => {
    return state.serverMessage.password;
});

export const getAuth = createSelector(state, (state) => state.isAuth);
