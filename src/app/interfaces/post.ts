export interface Post {
    title?: string;
    imageUrl?: string;
    content?: string;
    creator?: string | Creator;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    _id?: string;
}

export interface Creator {
    email?: string;
    name?: string;
    posts?: Array<string>;
    status?: string;
    __v?: number;
    _id?: string;
}

export interface Posts {
    posts: Post[];
    totalItems: number;
}

export interface CreatedPost {
    creator: Creator;
    post: Post;
}