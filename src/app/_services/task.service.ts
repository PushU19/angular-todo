import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BACKEND_HOST, DEVELOPER_NAME } from './token';
import { ClientError } from './custom-error';
import { CreateTask, RequestEditTask, RequestTaskParams, ResponseTask, } from '../_models/task';

@Injectable({
    providedIn: 'root',
})
export class TaskService {

    OK_STATUS: string = 'ok';

    constructor(
        private http: HttpClient,
        @Inject(BACKEND_HOST) private host: string,
        @Inject(DEVELOPER_NAME) private devName: string
    ) {
    }

    getTasks(options?: RequestTaskParams) {
        let params = '';
        if (options) {
            params = `/?developer=${this.devName}&sort_field=${options.sort_field}&sort_direction=${options.sort_direction}&page=${options.page + 1}`;
        }
        return this.http.get<ResponseTask>(`${this.host}${params}`).pipe(
            map((res) => {
                return res.message;
            }),
            catchError((error) => throwError(error))
        );
    }

    createTask(options: CreateTask) {
        const form = new FormData();
        form.append('username', options.username);
        form.append('email', options.email);
        form.append('text', options.text);
        return this.http
            .post<ResponseTask>(
                `${this.host}/create/?developer=${this.devName}`,
                form
            )
            .pipe(
                map((res) => {
                    if (res.status !== this.OK_STATUS) {
                        throw new ClientError('Недопустимые данные', res.message);
                    }
                    return res;
                }),
                catchError((error) => throwError(error))
            );
    }

    editTask(token: string, options: RequestEditTask) {
        const form = new FormData();
        form.append('text', options.text);
        form.append('status', options.status + '');
        form.append('token', token);
        return this.http
            .post<ResponseTask>(
                `${this.host}/edit/${options.id}/?developer=${this.devName}`,
                form
            )
            .pipe(
                map((res) => {
                    if (res.status !== this.OK_STATUS) {
                        throw new ClientError('Недопустимые данные', res.message);
                    }
                    return res;
                }),
                catchError((error) => throwError(error))
            );
    }
}
