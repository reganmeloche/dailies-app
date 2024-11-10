import express from 'express';
import { CategoryEnum } from './initialCategories';
import setup from './setup';
import { Config } from './config';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Get config
let config: Config;
if (process.env.NODE_ENV === 'development') {
    config = require('./configdev').default;
} else {
    config = require('./config').default;
}

// Setup
const { cacheLib, categories } = setup(config);

app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.get('/api/:category', async (req, res) => {
    const category = req.params.category as CategoryEnum;
    const result = await cacheLib.get(category, req.query.clear == 'true');
    res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});