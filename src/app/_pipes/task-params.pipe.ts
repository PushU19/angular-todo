import { Pipe, PipeTransform } from '@angular/core';
import { SortDirection, SortDirectionType, SortField, SortFieldType, StatusType, Status} from '../_models/enum';

@Pipe({ name: 'taskStatusPipe' })
export class TaskStatusPipe implements PipeTransform {
    transform(value: StatusType | null): string {
        if (!value && value!==0) {
            return '';
        }

        return Status[value];
    }
}

@Pipe({ name: 'taskSortPipe' })
export class TaskSortPipe implements PipeTransform {
    transform(value: SortFieldType | null): string {
        if (!value) {
            return '';
        }

        return SortField[value];
    }
}

@Pipe({ name: 'taskDirectPipe' })
export class TaskDirectPipe implements PipeTransform {
    transform(value: SortDirectionType | null): string {
        if (!value) {
            return '';
        }

        return SortDirection[value];
    }
}
