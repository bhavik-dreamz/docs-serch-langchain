import express from 'express';
import bodyParser from 'body-parser';
import { AISearchService } from './services/aiSearchService.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

let searchService: AISearchService;

app.post('/api/upload', async (req, res) => {
    try {
        await searchService.initialize();
        res.json({ message: 'Documents loaded and indexed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load documents' });
    }
});

app.post('/api/search', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Invalid query' });
        }
        const results = await searchService.search(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

const startServer = async () => {
    try {
        searchService = new AISearchService();
        await searchService.initialize();
        
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
            console.log('📚 Available endpoints:');
            console.log('   POST /api/upload - Reload and index documents');
            console.log('   POST /api/search - Search through documents');
        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();