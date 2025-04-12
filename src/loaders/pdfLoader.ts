import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import * as dotenv from 'dotenv';

dotenv.config();

export class PdfDocumentLoader {
    private loader: DirectoryLoader;

    constructor() {
        this.loader = new DirectoryLoader(
            process.env.PDF_DIRECTORY || "./docs/pdfs",
            {
                ".pdf": (path) => new PDFLoader(path),
            }
        );
    }

    async loadPdfs() {
        try {
            const docs = await this.loader.load();
            return docs;
        } catch (error) {
            console.error("Error loading PDFs:", error);
            throw error;
        }
    }
}