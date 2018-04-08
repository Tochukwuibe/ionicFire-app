export interface Post {
    userId: string;
    createdAt: Date;
    img: string;
    content: string;
    hearts: number; 
    [key: string]: any
    id?: string;
}