import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    getClientMessage(error: any): string {
        return error.message;
    }

    getClientErrorData(error: any): string {
        return error.getBody();
    }

    getServerMessage(error: any): string {
        if (error.status === 0) {
            return `Ошибка: ${error.message}`;
        } else {
            return `Ошибка ${error.status}: ${error.statusText}`;
        }
    }
}
