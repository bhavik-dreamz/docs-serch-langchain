export interface SearchResult {
    documentId: string;
    content: string;
    relevance: number;
    aiSummary: string;
}

export interface User {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
}