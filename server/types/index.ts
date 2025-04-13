export interface Document {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SearchResult {
    documentId: string;
    score: number;
    snippet: string;
}