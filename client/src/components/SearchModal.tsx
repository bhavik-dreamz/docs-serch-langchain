import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    Box,
    CircularProgress
} from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import api from '../services/api';
import { SearchResult } from '../types';

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const searchResults = await api.search(query);
            setResults(searchResults);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Typography flex={1}>Search Documents</Typography>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" gap={1} mb={2}>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your search query..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <IconButton onClick={handleSearch} disabled={loading}>
                        <Search />
                    </IconButton>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <List>
                        {results.map((result) => (
                            <ListItem key={result.documentId} divider>
                                <ListItemText
                                    primary={result.content}
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            AI Summary: {result.aiSummary}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};