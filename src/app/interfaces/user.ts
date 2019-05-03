import { Post } from 'src/app/interfaces';

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserSignup {
    email: string;
    password: string;
    image: any;
    name: string;
}

export interface LoginData {
    token: string;
    userId: string;
    name: string;
    imageUrl: string;
}

export interface SignupData {
    userId: string;
}

export interface UserData {
    email?: string;
    name?: string;
    status?: string;
    posts?: Post[];
    _id?: string;
    _v?: string;
}

