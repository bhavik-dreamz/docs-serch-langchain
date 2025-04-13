import React, { useState } from 'react';
import { 
    Button, 
    Box, 
    Typography, 
    CircularProgress,
    Alert 
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import api from '../services/api';

export const DocumentUpload: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) return;

        setUploading(true);
        setError(null);

        try {
            await api.uploadDocuments(event.target.files);
        } catch (err) {
            setError('Failed to upload documents');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
            <input
                type="file"
                multiple
                accept=".txt,.pdf"
                style={{ display: 'none' }}
                id="document-upload"
                onChange={handleFileUpload}
            />
            <label htmlFor="document-upload">
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUpload />}
                    disabled={uploading}
                >
                    Upload Documents
                </Button>
            </label>
            {uploading && (
                <Box sx={{ mt: 2 }}>
                    <CircularProgress size={24} />
                    <Typography>Uploading...</Typography>
                </Box>
            )}
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};