import { VectorStoreService } from './vectorStoreService';

export class SearchService {
    private vectorStore: VectorStoreService;

    constructor() {
        this.vectorStore = new VectorStoreService();
    }

    async search(query: string) {
        try {
            const results = await this.vectorStore.similaritySearch(query);
            return {
                success: true,
                results,
            };
        } catch (error) {
            console.error('Search error:', error);
            return {
                success: false,
                error: 'Failed to perform search',
            };
        }
    }
}