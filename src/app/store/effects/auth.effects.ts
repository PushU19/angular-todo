import { Injectable, Injector } from '@angular/core';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { AppErrorHandler } from 'src/app/_services/error-handler';
import { ClientError } from 'src/app/_services/custom-error';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/notification.service';

@Injectable()
export class AuthEffects {
    notificationService = this.injector.get(NotificationService);
    LoginUserRequest$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LoginUserRequest),
            switchMap((user) =>
                this.authService.login(user).pipe(
                    map(() => {
                        //this.router.navigate(['/']);
                        //this.notificationService.showError('Авторизация прошла успешно', 'success');
                        return AuthActions.LoginUserSuccess();
                    }),
                    catchError((err: Error) => {
                        let error: any = this.errorHandler.handleError(err);
                        if (err instanceof ClientError) {
                            return of(AuthActions.LoginUserFailure({ serverMessage: error }));
                        } else {
                            return of(AuthActions.LoginServerFailure({ serverError: error }));
                        }
                    })
                )
            )
        );
    });
    LogOutUser$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.LogoutUser),
                map(() => {
                    this.authService.logout();
                    this.router.navigate(['/']);
                    return of(null);
                })
            );
        },
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private errorHandler: AppErrorHandler,
        private router: Router,
        private injector: Injector
    ) {
    }
}
