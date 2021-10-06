import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BACKEND_HOST, DEVELOPER_NAME, TOKEN_KEY } from './token';
import { User, UserResponse } from '../_models/auth';
import { ClientError } from './custom-error';

const TOKEN_AGE = 1 * 24 * 60 * 60 * 1000;
const OK_STATUS = 'ok';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        @Inject(BACKEND_HOST) private host: string,
        @Inject(DEVELOPER_NAME) private devName: string,
        @Inject(TOKEN_KEY) private key: string
    ) {
    }

    login(user: User) {
        const form = new FormData();
        form.append('username', user.username);
        form.append('password', user.password);

        return this.http
            .post<UserResponse>(`${this.host}/login/?developer=${this.devName}`, form)
            .pipe(
                map((res) => {
                    if (res.status === OK_STATUS) {
                        let token: string = res.message.token;
                        if (token) {
                            let date = new Date(Date.now() + TOKEN_AGE);
                            this.cookieService.set(this.key, token, date);
                        }
                    } else {
                        throw new ClientError('Ошибка авторизации', res.message);
                    }
                    return res;
                }),
                catchError((error) => throwError(error))
            );
    }

    logout() {
        this.cookieService.delete(this.key);
    }

    isAuth(): boolean {
        const token = this.cookieService.get(this.key);
        return !!token;
    }
}
