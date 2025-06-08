import express from 'express';
import { CategoryEnum } from './helpers/initialCategories';
import setup from './setup';
import { Config } from './config';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Get config
let config: Config;
if (process.env.NODE_ENV === 'development') {
    console.log('Working in dev mode...');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    config = require('./configdev').default;
} else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    config = require('./config').default;
}

// Setup
const { fetchLib, categories, authLib, seeder } = setup(config);

app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// Exchange authorization code for access token
app.post('/api/auth', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        res.status(400).json({ error: 'Missing auth code' });
    }

    try {
        const authResult = await authLib.authSetup(code);
        res.json(authResult);
    } catch (error) {
        console.error('Error in Google Auth:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// Validate an access token
app.post('/api/validate', async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        res.status(400).json({ error: 'Missing access token' });
    }

    try {
        const validationResult = await authLib.validateAccessToken(token);
        res.json(validationResult);
    } catch (error) {
        console.error('Error in Google Auth:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// Seed the data
app.post('/api/seed', async (req, res) => {
    const secret = req.header('x-seed-secret');
    if (secret !== config.seedPassword) {
        res.status(403).json({ error: 'Invalid seed secret. '});
        return;
    }

    try {
        const forceSeed = req.query.force === 'true';
        seeder.trySeed(forceSeed);
        res.json('Seeding complete');
    } catch (error) {
        console.error('Seeding error: ', error);
        res.status(500).json({ error: 'Seeding failed.' });
    }
});

// Get the content for a category
app.get('/api/:category', async (req, res) => {
    try {
        const category = req.params.category as CategoryEnum;
        const result = await fetchLib.get(category);
        res.json(result);
    } catch (error) {
        console.error('Fetching error: ', error);
        res.status(500).json({ error: `Fetching ${req.params.category} failed.` });
    }
});


// Front end setup
if (process.env.NODE_ENV !== 'development') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "build")));

  // Handle React routing, return index.html for unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});