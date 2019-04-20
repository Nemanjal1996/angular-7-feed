import { Post } from './post';

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserSignup {
    email: string;
    password: string;
    name: string;
}

export interface UserData {
    email?: string;
    name?: string;
    status?: string;
    posts?: Post[];
}

export interface LoginData {
    token: string;
    userId: string;
    name: string;
}

export interface SignupData {
    userId: string;
}
