import OpenAI from 'openai';
import { DocumentLoader } from '../loaders/documentLoader';

interface SearchResult {
    documentId: string;
    content: string;
    relevance: number;
    aiSummary: string;
}

export class AISearchService {
    private openai: OpenAI;
    private documents: Map<string, any> = new Map();
    private documentLoader: DocumentLoader;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.documentLoader = new DocumentLoader();
    }

    async initialize() {
        console.log('Loading and indexing documents...');
        const docs = await this.documentLoader.loadDocuments();
        docs.forEach(doc => this.documents.set(doc.id, doc));
        console.log('Document indexing complete');
    }

    async search(query: string): Promise<SearchResult[]> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that searches through documents and provides relevant information."
                    },
                    {
                        role: "user",
                        content: `Search query: ${query}\nDocuments: ${this.getDocumentContents()}`
                    }
                ],
                temperature: 0.3,
            });

            const response = completion.choices[0].message.content || '';
            const results = this.processResults(query, response);
            return results;
        } catch (error) {
            console.error('Search error:', error);
            throw new Error('Failed to perform search');
        }
    }

    private getDocumentContents(): string {
        return Array.from(this.documents.values())
            .map(doc => `[${doc.id}]: ${doc.content}`)
            .join('\n\n');
    }

    private processResults(query: string, aiResponse: string): SearchResult[] {
        const results: SearchResult[] = [];
        for (const [id, doc] of this.documents.entries()) {
            const relevance = this.calculateRelevance(query, doc.content);
            if (relevance > 0.3) {
                results.push({
                    documentId: id,
                    content: doc.content.substring(0, 200) + '...',
                    relevance,
                    aiSummary: aiResponse
                });
            }
        }
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    private calculateRelevance(query: string, content: string): number {
        const queryWords = query.toLowerCase().split(' ');
        const contentWords = content.toLowerCase().split(' ');
        let matches = 0;
        
        queryWords.forEach(word => {
            if (contentWords.includes(word)) matches++;
        });
        
        return matches / queryWords.length;
    }
}