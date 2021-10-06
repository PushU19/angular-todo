import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/_models/auth';

export const LoginUserRequest = createAction(
    '[User] Login User',
    props<{ username: string, password: string }>()
);
export const LoginUserSuccess = createAction(
    '[User] Login User Success'
);
export const LoginUserFailure = createAction(
    '[User] Login User Failure',
    props<{ serverMessage: User }>()
);
export const LoginServerFailure = createAction(
    '[User] Login User Failure',
    props<{ serverError: string }>()
);
export const LogoutUser = createAction(
    '[User] Logout User'
);
