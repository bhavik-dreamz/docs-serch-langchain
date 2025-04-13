import { ChromaClient } from 'chromadb';
import { Document } from '@langchain/core/documents';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { OpenAIEmbeddings } from '@langchain/openai';
import dotenv from 'dotenv';

dotenv.config();

export class VectorStoreService {
    private embeddings: OpenAIEmbeddings;
    private vectorStore: Chroma | null = null;

    constructor() {
        this.embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
    }

    async initializeStore() {
        this.vectorStore = new Chroma({
            collectionName: process.env.SEARCH_INDEX_NAME || "default_collection",
            embeddings: this.embeddings,
        });
    }

    async addDocuments(documents: Document[]) {
        if (!this.vectorStore) {
            await this.initializeStore();
        }
        await this.vectorStore?.addDocuments(documents);
    }

    async similaritySearch(query: string, k: number = 5) {
        if (!this.vectorStore) {
            await this.initializeStore();
        }
        return await this.vectorStore?.similaritySearch(query, k);
    }
}