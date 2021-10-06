export interface User {
    username: string;
    password: string;
}

export interface UserResponse {
    status: string;
    message: {
        token: string;
    };
}

export interface UserError {
    status: string;
    message: User;
}
