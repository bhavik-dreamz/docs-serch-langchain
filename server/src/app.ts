import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});