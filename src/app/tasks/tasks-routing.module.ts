import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task-list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: TaskListComponent,
    },
    {
        path: 'add',
        component: AddEditComponent,
    },
    {
        path: ':id/edit',
        component: AddEditComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksRoutingModule {
}
