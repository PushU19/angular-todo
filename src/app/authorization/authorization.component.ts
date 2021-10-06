import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { LoginUserRequest } from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { getServerMessagePassword, getServerMessageUsername, getAuth } from '../store/selectors/auth.selectors';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {
    isAuth$ = this.store$.select(getAuth);

    usernameError$ = this.store$.select(getServerMessageUsername).pipe(map((val) => {
        if (val) {
            this.usernameControl.setErrors({ 'invalid': val });
        }

        return val;
    }));
    passwordError$ = this.store$.select(getServerMessagePassword).pipe(map((val) => {
        if (val) {
            this.passwordControl.setErrors({ 'invalid': val });
        }

        return val;
    }));

    usernameControl = new FormControl(
        null,
        Validators.required
    );

    passwordControl = new FormControl(
        null,
        Validators.required
    );

    form = new FormGroup({
        username: this.usernameControl,
        password: this.passwordControl,
    });

    constructor(private store$: Store, private router: Router) {
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        if (this.form.valid) {
            this.store$.dispatch(LoginUserRequest(this.form.value));
        }
    }

    redirectToMain(): void {
        this.router.navigate(['/']);
    }
}