import  { PostStatus } from './postStatus';

export type Post = {
    id: number;
    type: PostStatus;
    description?: string | null;
};