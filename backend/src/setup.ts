import ComicLib from "./libs/comicLib";
import { initialCategories } from "./helpers/initialCategories";
import JokeLib from "./libs/jokeLib";
import ContentFetcher from "./contentFetcher";
import NinjaApi from "./helpers/ninjaApi";
import ArtApi from "./helpers/artApi";
import { Config } from './config';
import { Category } from "./classes/category";
import QuoteLib from "./libs/quoteLib";
import RiddleLib from "./libs/riddleLib";
import PoemLib from "./libs/poemLib";
import PoemApi from "./helpers/poemApi";
import TropeLib from "./libs/tropeLib";
import FactLib from "./libs/factLib";
import PictureLib from "./libs/pictureLib";
import QuizLib from "./libs/quizLib";
import AuthLib from "./utils/authLib";
import Seeder from "./seeder";

import { OAuth2Client } from 'google-auth-library';
import OpenAiApi, { OpenAiOptions } from "./helpers/llmApi";
import { PrismaClient } from '@prisma/client';
import ContentStorage from "./contentStorage";
import TipLib from "./libs/tipLib";
import RecipeLib from "./libs/recipeLib";
import ArtLib from "./libs/artLib";
import MusicLib from "./libs/musicLib";

interface Services {
    contentStorage: ContentStorage,
    categories: Category[],
    authLib: AuthLib,
    seeder: Seeder
};

function setup(config: Config): Services {
    const ninjaApi = new NinjaApi(config.ninjasApiKey);
    const poemApi = new PoemApi();
    const artApi = new ArtApi();


    const googleClient = new OAuth2Client(config.googleClientId, config.googleClientSecret, config.googleRedirectURI);
    const authLib = new AuthLib(googleClient);

    // TODO: May make these more configurable
    const openAiOptions = new OpenAiOptions(
        config.openAIApiKey,
        'https://api.openai.com/v1/chat/completions',
        'gpt-3.5-turbo',
        700,
        0.85
    );
    const llmApi = new OpenAiApi(openAiOptions);

    const quizTopics = [
        // Health/Life
        ['nutrition', 'intermediate'], 
        ['health and exercise', 'intermediate'],
        ['clinical pathophysiology', 'intermediate'], 
        ['human anatomy', 'intermediate'], 
        ['first aid', 'advanced'],
        ['dog training', 'advanced'],
        
        // Media
        ['film structure', 'intermediate'],
        ['film history', 'intermediate'],
        ['film theory', 'intermediate'],
        ['Media Analysis', 'intermediate'],
        ['Media Literacy', 'advanced'],

        // Interests
        ['canadian history', 'advanced'],
        ['geography', 'advanced'],
        ['ancient history', 'advanced'],
        ['economics', 'advanced'],
        ['canadian politics', 'advanced'],
        ['political theory', 'advanced'],
        ['nuclear energy and nuclear politics', 'intermediate'],
        ['Ethical AI', 'advanced'],
        ['AI principles', 'advanced'],

        // Tech
        ['databases', 'intermediate'], 
        ['computer science', 'expert'],
        ['software development', 'expert'],
        ['software design and architecture', 'expert'],
        ['software cybersecurity', 'advanced'],
        ['computer networking', 'advanced']
    ];

    const tipTopics = [
        ['health', 'wellness', 'fitness', 'nutrition', 'first aid', 'dog health'],
        ['technology', 'programming', 'c++', 'software architecture', 'cybersecurity'],
        ['productivity', 'time management', 'organization', 'random', 'life hacks'],
    ];

    const cuisinePrompts: string[] = [];

    const genrePrompts: string[] = [];

    const lib = new ContentFetcher(
        new ComicLib(),
        new JokeLib(ninjaApi),
        new QuoteLib(ninjaApi),
        new RiddleLib(ninjaApi),
        new PoemLib(poemApi),
        new TropeLib(),
        new FactLib(ninjaApi),
        new PictureLib(),
        new QuizLib(llmApi, quizTopics),
        new TipLib(llmApi, tipTopics),
        new RecipeLib(llmApi, cuisinePrompts),
        new ArtLib(artApi),
        new MusicLib(llmApi, genrePrompts)
    );

    const dbClient = new PrismaClient();
    const seeder = new Seeder(lib, initialCategories, dbClient);

    const services: Services = {
        contentStorage: new ContentStorage(dbClient),
        categories: initialCategories,
        authLib: authLib,
        seeder: seeder,
    };
    
    return services;
};

export default setup;