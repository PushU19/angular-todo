export enum SortFieldType {
    id = 'id',
    username = 'username',
    email = 'email',
    status = 'status',
}

export const SortField = {
    [SortFieldType.id]: 'по-умолчанию',
    [SortFieldType.username]: 'Пользователь',
    [SortFieldType.email]: 'Email',
    [SortFieldType.status]: 'Статус',
};

export enum SortDirectionType {
    asc = 'asc',
    desc = 'desc',
}

export const SortDirection = {
    [SortDirectionType.asc]: 'по возрастанию',
    [SortDirectionType.desc]: 'по убыванию',
};

export enum StatusType {
    created = 0,
    created_and_edited = 1,
    ready = 10,
    ready_and_edited = 11,
}

export const Status = {
    [StatusType.created]: 'Создано',
    [StatusType.created_and_edited]:'Создано(ред.)',
    [StatusType.ready]:'Выполнено',
    [StatusType.ready_and_edited]:'Выполнено(ред.)',
}
