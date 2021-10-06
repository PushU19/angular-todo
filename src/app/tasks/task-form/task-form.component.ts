import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { getServerMessageEmail, getServerMessageText, getServerMessageUsername } from 'src/app/store/selectors/tasks.selectors';
import { Task } from '../../_models/task';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
    isTaskReady: boolean = false;

    @Input() isCreateMode: boolean;
    @Input() task: Task | null = {} as Task;
    @Output() onSubmitForm = new EventEmitter();
    @Output() onCancelForm = new EventEmitter();

    constructor( private store$: Store) {
        this.isCreateMode = false;
    }

    usernameError$ = this.store$.select(getServerMessageUsername).pipe(map((val) => {
        if (val) {
            this.usernameControl.setErrors({ 'invalid': val });
        }
       return val;
    }));
    emailError$ = this.store$.select(getServerMessageEmail).pipe(map((val) => {
        if (val) {
            this.emailControl.setErrors({ 'invalid': val });
        }
       return val;
    }));
    textError$ = this.store$.select(getServerMessageText).pipe(map((val) => {
        if (val) {
            this.textControl.setErrors({ 'invalid': val });
        }
       return val;
    }));

    usernameControl = new FormControl(
        null,
        Validators.required
    );
    emailControl = new FormControl(
        null,
        Validators.required
    );
    textControl = new FormControl(
        null,
        Validators.required
    );

    taskForm = new FormGroup({
        taskUser: this.usernameControl,
        taskEmail: this.emailControl,
        taskText: this.textControl,
        taskStatus: new FormControl(''),
    });

    ngOnInit(): void {
        if (this.task?.status == 0 || this.task?.status == 1) {
            this.isTaskReady = false;
        } else {
            this.isTaskReady = true;
        }
        this.taskForm.patchValue({
            taskUser: this.task?.username || '',
            taskEmail: this.task?.email || '',
            taskText: this.task?.text || '',
            taskStatus: this.isTaskReady,
        });
        if (!this.isCreateMode) {
            this.taskForm.controls['taskUser'].disable();
            this.taskForm.controls['taskEmail'].disable();
        }
    }

    onSubmit() {
        this.onSubmitForm.emit(this.taskForm.value);
    }

    onCancel() {
        this.onCancelForm.emit();
    }
}
