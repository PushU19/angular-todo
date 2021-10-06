import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from './notification.service';
import { ErrorService } from './error.service';
import { ClientError } from './custom-error';

@Injectable({
    providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {
    }

    handleError(error: any | HttpErrorResponse): any {
        const errorService = this.injector.get(ErrorService);
        const notificationService = this.injector.get(NotificationService);

        let message, body: string;

        if (error instanceof HttpErrorResponse) {
            message = errorService.getServerMessage(error);
            notificationService.showError(message, 'error');
            return message;
        } else if (error instanceof ClientError) {
            message = errorService.getClientMessage(error);
            body = errorService.getClientErrorData(error);
            notificationService.showError(message, 'error');
            return body;
        } else {
            console.log(error);
            message = errorService.getClientMessage(error);
            //notificationService.showError(message, 'error');
            return message;
        }
    }
}
