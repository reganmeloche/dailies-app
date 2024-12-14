import express from 'express';
import { CategoryEnum } from './helpers/initialCategories';
import setup from './setup';
import { Config } from './config';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());


// Front end setup
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Handle React routing, return index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Get config
let config: Config;
if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    config = require('./configdev').default;
} else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
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