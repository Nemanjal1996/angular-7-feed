import { Like } from 'src/app/interfaces';

export interface Comment {
    comment: string;
    userId: string;
    postId: string;
    likes: Like[];
    _id: string;
    __v: number;
}