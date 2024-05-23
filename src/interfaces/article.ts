export interface Article {
    id: string | null;
    author: string | null;
    title: string;
    description: string;
    url: string;
    imageUrl: string | null;
    published: string;
    content: string;
}