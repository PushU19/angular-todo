import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(public snackBar: MatSnackBar, private readonly zone: NgZone) {
    }

    showError(message: string, type: string): void {
        this.zone.run(() => {
            let className: string;
            switch (type) {
                case 'success':
                    className = 'success-snackbar';
                    break;
                case 'warn':
                    className = 'warn-snackbar';
                    break;
                case 'error':
                    className = 'error-snackbar';
                    break;
                default:
                    className = 'default-snackbar';
            }
            const snackBar = this.snackBar.open(message, '✖', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                panelClass: [className],
                duration: 3000
            });
            snackBar.onAction().subscribe(() => {
                snackBar.dismiss();
            });
        });
    }
}
