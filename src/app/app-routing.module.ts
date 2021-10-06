import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const tasksModule = () => import('./tasks/tasks.module').then(x => x.TasksModule);
const authModule = () => import('./authorization/authorization.module').then(x => x.AuthorizationModule);

export const routes: Routes = [
    {
        path: 'tasks',
        loadChildren: tasksModule
    },
    {
        path: 'auth',
        loadChildren: authModule
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
