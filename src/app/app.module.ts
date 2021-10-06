import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './_material/material.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { CookieService } from 'ngx-cookie-service';
import { AppErrorHandler } from './_services/error-handler';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { reducers } from './store';

import { TasksEffects } from './store/effects/tasks.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { BACKEND_HOST, DEVELOPER_NAME, TOKEN_KEY } from './_services/token';

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            //logOnly: environment.production, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
        EffectsModule.forRoot([TasksEffects, AuthEffects]),
    ],
    providers: [
        {
            provide: BACKEND_HOST,
            useValue: 'https://uxcandy.com/~shapoval/test-task-backend/v2',
            //useValue: 'http://192.168.0.191:3003'
        },
        {
            provide: DEVELOPER_NAME,
            useValue: 'User',
        },
        {
            provide: TOKEN_KEY,
            useValue: 'Auth-Token',
        },
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler,
        },
        CookieService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
