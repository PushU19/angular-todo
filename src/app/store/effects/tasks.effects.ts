import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { TaskService } from '../../_services/task.service';
import { AppErrorHandler } from 'src/app/_services/error-handler';
import { ClientError } from 'src/app/_services/custom-error';
import * as TaskActions from '../actions/tasks.actions';
import { Store } from '@ngrx/store';
import { State } from '..';
import { TOKEN_KEY } from 'src/app/_services/token';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from 'src/app/_services/notification.service';

@Injectable()
export class TasksEffects {
  getTasksRequest$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(
          TaskActions.PostEditTaskSuccess,
        TaskActions.SetTasksPage,
        TaskActions.SetTasksSortDirection,
        TaskActions.SetTasksSortField,
        TaskActions.SetTastListParams
      ),
      map(() => this.store$.dispatch(TaskActions.GetTasksRequest())),
      withLatestFrom(this.store$),
      switchMap(([, store]) => {
        return this.taskService.getTasks({
          page: store.tasks.page,
          sort_direction: store.tasks.sort_direction,
          sort_field: store.tasks.sort_field,
        });
      }),
      map((messageTask) => TaskActions.GetTasksSuccess({ messageTask })),
      catchError((err: Error) => {
        let error: any = this.errorHandler.handleError(err);
        if (err instanceof ClientError) {
          return of(TaskActions.GetTasksFailure({ serverMessage: error }));
        } else {
          return of(TaskActions.GetServerFailure({ serverError: error }));
        }
      })
    );
  });
  postCreateTaskRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.PostCreateTaskRequest),
      switchMap((options) =>
        this.taskService.createTask(options).pipe(
          map(() => {
            this.router.navigate(['/']);
            this.notificationService.showError(
              'Задача успешно добавлена.',
              'success'
            );
            return TaskActions.PostCreateTaskSuccess();
          }),
          catchError((err: Error) => {
            let error: any = this.errorHandler.handleError(err);
            if (err instanceof ClientError) {
              return of(TaskActions.GetTasksFailure({ serverMessage: error }));
            } else {
              return of(TaskActions.GetServerFailure({ serverError: error }));
            }
          })
        )
      )
    );
  });
  postEditTaskRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.PostEditTaskRequest),
      switchMap((options) => {
        let token = this.cookieService.get(this.key);
        return this.taskService.editTask(token, options).pipe(
          map(() => TaskActions.PostEditTaskSuccess()),
          catchError((err: Error) => {
            let error: any = this.errorHandler.handleError(err);
            if (err instanceof ClientError) {
              if (error.token) {
                this.notificationService.showError(error.token, 'error');
              }
              return of(TaskActions.GetTasksFailure({ serverMessage: error }));
            } else {
              return of(TaskActions.GetServerFailure({ serverError: error }));
            }
          })
        );
      })
    );
  });
  changeTaskListParams$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          TaskActions.SetTasksPage,
          TaskActions.SetTasksSortDirection,
          TaskActions.SetTasksSortField,
          TaskActions.SetTastListParams
        ),
        withLatestFrom(this.store$),
        map(([, store]) => {
          const { sort_field, page, sort_direction } = store.tasks;
          const queryParams: Params = {
            page,
            sort_field,
            sort_direction,
          };
          this.router.navigate([], {
            relativeTo: this.activatedRouter,
            queryParams,
            queryParamsHandling: 'merge',
          });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private errorHandler: AppErrorHandler,
    private store$: Store<State>,
    private router: Router,
    @Inject(TOKEN_KEY) private key: string,
    private cookieService: CookieService,
    private activatedRouter: ActivatedRoute,
    private notificationService: NotificationService
  ) {}
}
