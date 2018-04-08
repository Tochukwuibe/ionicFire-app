export interface Post {
    userId: string;
    createdAt: Date;
    img: string;
    content: string;
    likesCount: number; 
    [key: string]: any
}