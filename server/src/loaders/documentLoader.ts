import { promises as fs } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export interface Document {
    id: string;
    content: string;
    metadata: {
        path: string;
        type: string;
        timestamp: string;
    };
}

export class DocumentLoader {
    private directory: string;

    constructor() {
        this.directory = process.env.DOCUMENT_DIRECTORY || "./docs/documents";
    }

    async loadDocuments(): Promise<Document[]> {
        try {
            await this.ensureDirectory();
            const files = await fs.readdir(this.directory);
            const textFiles = files.filter(file => file.endsWith('.txt'));
            
            const documents = await Promise.all(
                textFiles.map(async (file) => {
                    const path = join(this.directory, file);
                    const content = await fs.readFile(path, 'utf-8');
                    const stats = await fs.stat(path);
                    
                    return {
                        id: Buffer.from(path).toString('base64'),
                        content: this.preprocessContent(content),
                        metadata: {
                            path,
                            type: 'text',
                            timestamp: stats.mtime.toISOString()
                        }
                    };
                })
            );

            return documents;
        } catch (error) {
            console.error("Error loading documents:", error);
            throw error;
        }
    }

    private async ensureDirectory() {
        try {
            await fs.access(this.directory);
        } catch {
            await fs.mkdir(this.directory, { recursive: true });
        }
    }

    private preprocessContent(content: string): string {
        return content
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[^\w\s.,?!-]/g, '');
    }
}