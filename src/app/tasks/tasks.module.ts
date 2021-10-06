import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../_material/material.module';
import { TasksRoutingModule } from './tasks-routing.module';

import { TaskListComponent } from '../tasks/task-list.component';
import { TaskComponent } from './task/task.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskEditDialog } from './task-edit-dialog.component';
import { TaskDirectPipe, TaskSortPipe, TaskStatusPipe } from 'src/app/_pipes/task-params.pipe';

@NgModule({
    declarations: [
        TaskListComponent,
        TaskComponent,
        AddEditComponent,
        TaskFormComponent,
        TaskEditDialog,
        TaskStatusPipe,
        TaskSortPipe,
        TaskDirectPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TasksRoutingModule
    ],
})
export class TasksModule {
}
