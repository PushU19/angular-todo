import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostEditTaskRequest } from '../store/actions/tasks.actions';
import { Store } from '@ngrx/store';
import { Task } from '../_models/task';
import { StatusType } from '../_models/enum';

export interface Data {
    task: Task;
    id: number;
}

@Component({
    selector: 'app-edit-dialog',
    templateUrl: 'task-edit-dialog.component.html',
})
export class TaskEditDialog {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Data,
        public dialog: MatDialog,
        private store$: Store,
        public dialogRef: MatDialogRef<TaskEditDialog>,
    ) {
    }

    onSubmitForm(form: any): void {
        let isEdited = (this.data.task.status === 1 || this.data.task.status === 11);
        let editedState = (form.taskStatus) ? StatusType.ready_and_edited : StatusType.created_and_edited;
        let currentStatus = form.taskStatus ? StatusType.ready : StatusType.created;
        let editStatus = (this.data.task.text !== form.taskText || isEdited) ? editedState : currentStatus;
        
        this.store$.dispatch(
            PostEditTaskRequest({
                id: this.data.id,
                text: form.taskText,
                status: editStatus,
            })
        );
        this.dialogRef.close();
    }

    onCancelForm(): void {
        this.dialogRef.close();
    }
}
