import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Container, 
    Box 
} from '@mui/material';
import { DocumentUpload } from './components/DocumentUpload';
import { SearchModal } from './components/SearchModal';
import api from './services/api';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            AI Document Search
                        </Typography>
                        <Button color="inherit" onClick={() => setSearchOpen(true)}>
                            Search
                        </Button>
                        <Button color="inherit" onClick={() => api.login()}>
                            Login with GitHub
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="md">
                    <Box sx={{ my: 4 }}>
                        <DocumentUpload />
                    </Box>
                </Container>

                <SearchModal
                    open={searchOpen}
                    onClose={() => setSearchOpen(false)}
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;