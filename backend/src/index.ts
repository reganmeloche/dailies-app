import express from 'express';

import MainLib from './mainLib';
import { CategoryEnum, initialCategories } from './initialCategories';
import ComicLib from './comicLib';
import JokeLib from './jokeLib';
import NinjaApi from './ninjaApi';
import CacheLib from './cacheLib';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// TODO: Hide the api key in secrets
// TODO: Separate file for DI
const ninjaApi = new NinjaApi('API-KEY');
const lib = new MainLib(
    initialCategories,
    new ComicLib(),
    new JokeLib(ninjaApi)
);

const cacheLib = new CacheLib(lib);

app.get('/api/categories', (req, res) => {
    res.json(lib.getCategories());
});

app.get('/api/:category', async (req, res) => {
    const category = req.params.category as CategoryEnum;
    const result = await cacheLib.get(category, req.query.clear == 'true');
    res.json(result);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});