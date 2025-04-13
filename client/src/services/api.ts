import axios from 'axios';
import { SearchResult } from '../types';

const api = {
    async search(query: string): Promise<SearchResult[]> {
        const response = await axios.post('/api/search', { query });
        return response.data;
    },

    async uploadDocuments(files: FileList): Promise<void> {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('documents', file);
        });
        await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async login(): Promise<void> {
        window.location.href = '/auth/github';
    },
};

export default api;