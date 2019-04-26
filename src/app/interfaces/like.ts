import { Post, UserData } from 'src/app/interfaces';

export interface Like {
    _id: string;
    __v: number;
    type?: string;
    postId?: any;
    userId?: any;
}
