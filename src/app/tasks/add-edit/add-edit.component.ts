import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getTaskById } from 'src/app/store/selectors/tasks.selectors';
import { PostCreateTaskRequest, PostEditTaskRequest, } from 'src/app/store/actions/tasks.actions';
import { Store } from '@ngrx/store';
import { Task } from '../../_models/task';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
    taskId: number | undefined;
    task$: Observable<Task> = new Observable<Task>();
    isCreateMode: boolean = true;
    initialTaskStatus: number = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store$: Store
    ) {
    }

    ngOnInit(): void {
        this.taskId = this.route.snapshot.params['id'];
        this.isCreateMode = !this.taskId;
        //let initialText: string;

        if (this.taskId) {
            this.task$ = this.store$.select(getTaskById(this.taskId));
            //console.log(this.task$.pipe(map(task => task.text)));
        }
    }

    onSubmitForm(form: any): void {

        if (this.isCreateMode) {
            this.store$.dispatch(
                PostCreateTaskRequest({
                    username: form.taskUser,
                    email: form.taskEmail,
                    text: form.taskText,
                })
            );
        } else {
            if (this.taskId) {
                this.store$.dispatch(
                    PostEditTaskRequest({
                        id: this.taskId,
                        text: form.taskText,
                        status: form.status,
                    })
                );
            }
        }
    }

    onCancelForm(): void {
        this.router.navigate(['/']);
    }
}
