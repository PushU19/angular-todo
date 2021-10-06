import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../redusers/tasks.reducer';

export const state = createFeatureSelector<State>('tasks');

export const getTasks = createSelector(state, (state) => state.tasks);
export const getTotalTaskCount = createSelector(
    state,
    (state) => state.total_task_count
);
export const getTasksList = createSelector(state, (state) =>
    Object.values(state.tasks)
);
export const getPage = createSelector(state, (state) => state.page);
export const getTaskById = (id: number) =>
    createSelector(state, (state) => state.tasks[id]);
export const getSortField = createSelector(state, (state) => state.sort_field);
export const getSortDirection = createSelector(
    state,
    (state) => state.sort_direction
);

export const tasksIsLoading = createSelector(state, (state) => state.loading);

export const getServerMessageUsername = createSelector(state, (state) => {
    return state.serverMessage.username;
});
export const getServerMessageEmail = createSelector(state, (state) => {
    return state.serverMessage.email;
});
export const getServerMessageText = createSelector(state, (state) => {
    return state.serverMessage.text;
});