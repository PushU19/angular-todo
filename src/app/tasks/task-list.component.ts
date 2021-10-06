import { Component, OnInit } from '@angular/core';
import * as TaskActions from '../store/actions/tasks.actions';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { SortDirection, SortDirectionType, SortField, SortFieldType, } from '../_models/enum';
import * as taskSelectors from '../store/selectors/tasks.selectors';

import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
    tasks$ = this.store$.select(taskSelectors.getTasksList);
    total_task_count$ = this.store$.select(taskSelectors.getTotalTaskCount);
    hasTasks$ = this.tasks$.pipe(map((tasks) => !!tasks.length));
    selectedSortField$ = this.store$.select(taskSelectors.getSortField);
    selectedSortDirection$ = this.store$.select(taskSelectors.getSortDirection);
    selectedPage$ = this.store$.select(taskSelectors.getPage);
    tasksIsLoading$ = this.store$.select(taskSelectors.tasksIsLoading);

    sortFieldTypes = Object.values(SortFieldType).reduce<Array<{ label: string; value: string }>>((memo, key) => {
        memo.push({ label: SortField[key], value: key });
        return memo;
    }, []);

    sortDirectionTypes = Object.values(SortDirectionType).reduce<Array<{ label: string; value: string }>>((memo, key) => {
        memo.push({ label: SortDirection[key], value: key });
        return memo;
    }, []);

    pageSize: number = 3;
    pageSizeOptions: number[] = [3];

    constructor(
        private store$: Store,
        private router: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        let page: number | undefined;
        let sort_field: SortFieldType | undefined;
        let sort_direction: SortDirectionType | undefined;

        const query = this.router.snapshot.queryParamMap;

        const queryPage = query.get('page');
        if (queryPage) {
            page = +queryPage;
        }

        const querySortField = query.get('sort_field');
        if (
            !!querySortField &&
            Object.values(SortFieldType).includes(querySortField as SortFieldType)
        ) {
            sort_field = querySortField as SortFieldType;
        }

        const querySortDirection = query.get('sort_direction');
        if (
            !!querySortDirection &&
            Object.values(SortDirectionType).includes(
                querySortDirection as SortDirectionType
            )
        ) {
            sort_direction = querySortDirection as SortDirectionType;
        }

        if (!!page || !!sort_field || !!sort_direction) {
            const params: {
                page?: number;
                sort_field?: SortFieldType;
                sort_direction?: SortDirectionType;
            } = {};
            if (page) {
                params['page'] = page;
            }

            if (sort_field) {
                params['sort_field'] = sort_field;
            }

            if (sort_direction) {
                params['sort_direction'] = sort_direction;
            }
            this.store$.dispatch(TaskActions.SetTastListParams(params));
        } else {
            zip(
                this.selectedPage$,
                this.selectedSortField$,
                this.selectedSortDirection$
            )
                .pipe(
                    map(([page, sort_field, sort_direction]) => {
                        this.store$.dispatch(
                            TaskActions.SetTastListParams({
                                page,
                                sort_field,
                                sort_direction,
                            })
                        );
                    }),
                    first()
                )
                .subscribe(() => {
                });
        }
    }

    setPage(event?: PageEvent) {
        if (event) {
            this.store$.dispatch(TaskActions.SetTasksPage({ page: event.pageIndex }));
        }
    }

    setField(event: MatSelectChange) {
        if (event) {
            this.store$.dispatch(
                TaskActions.SetTasksSortField({ sort_field: event.value })
            );
        }
    }

    setDirect(event: MatSelectChange) {
        if (event) {
            this.store$.dispatch(
                TaskActions.SetTasksSortDirection({ sort_direction: event.value })
            );
        }
    }
}
