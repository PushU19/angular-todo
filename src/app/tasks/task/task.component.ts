import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialog } from '../task-edit-dialog.component';
import { Task } from '../../_models/task';
import { getTaskById } from 'src/app/store/selectors/tasks.selectors';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { getAuth } from 'src/app/store/selectors/auth.selectors';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
})
export class TaskComponent {
    isAuth$ = this.store$.select(getAuth);

    @Input() task: Task;

    constructor(
        public dialog: MatDialog,
        private store$: Store
    ) {
        this.task = {} as Task;
    }

    editTask(id: number): void {
        this.store$
            .select(getTaskById(id))
            .pipe(first())
            .subscribe((task) => {

                const dialogRef = this.dialog.open(TaskEditDialog, {
                    width: '500px',
                    data: { task, id },
                });
            });
    }    

}
