import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuth } from './store/selectors/auth.selectors';
import { LoginUserSuccess, LogoutUser } from './store/actions/auth.actions';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'angular-to-do';

    isAuth$ = this.store$.select(getAuth);

    constructor(
        private store$: Store,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        if (this.authService.isAuth()) {
            this.store$.dispatch(LoginUserSuccess());
        }
    }

    onLogOut() {
        this.store$.dispatch(LogoutUser());
        this.router.navigate(['/']);
    }
}
