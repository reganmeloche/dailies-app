import express from 'express';

import MainLib from './mainLib';
import { initialCategories } from './initialCategories';
import ComicLib from './comicLib';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

const lib = new MainLib(
    initialCategories,
    new ComicLib()
);

app.get('/api/categories', (req, res) => {
    res.json(lib.getCategories());
});

app.get('/api/joke', (req, res) => {
    res.json(lib.getJoke());
});

app.get('/api/fact', (req, res) => {
    res.json(lib.getFact());
});

app.get('/api/quote', (req, res) => {
    res.json(lib.getQuote());
});

app.get('/api/calvin', async (req, res) => {
    const result = await lib.getCalvinAndHobbes()
    res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});