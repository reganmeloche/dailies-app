import ComicLib from "./libs/comicLib";
import { initialCategories } from "./helpers/initialCategories";
import JokeLib from "./libs/jokeLib";
import MainLib from "./mainLib";
import NinjaApi from "./helpers/ninjaApi";
import { Config } from './config';
import { Category } from "./classes/category";
import QuoteLib from "./libs/quoteLib";
import RiddleLib from "./libs/riddleLib";
import PoemLib from "./libs/poemLib";
import PoemApi from "./helpers/poemApi";
import TropeLib from "./libs/tropeLib";
import TropeApi from "./helpers/tropeApi";
import FactLib from "./libs/factLib";
import UnsplashApi from "./helpers/unsplashApi";
import PictureLib from "./libs/pictureLib";
import QuizLib from "./libs/quizLib";
import AuthLib from "./authLib";
import Seeder from "./seeder";

import { OAuth2Client } from 'google-auth-library';
import OpenAiApi, { OpenAiOptions } from "./helpers/llmApi";
import { PrismaClient } from '@prisma/client';
import FetchLib from "./fetchLib";
import TipLib from "./libs/tipLib";

interface Services {
    fetchLib: FetchLib,
    categories: Category[],
    authLib: AuthLib,
    seeder: Seeder
};

function setup(config: Config): Services {
    const ninjaApi = new NinjaApi(config.ninjasApiKey);
    const poemApi = new PoemApi();
    const tropeApi = new TropeApi();
    const unsplashApi = new UnsplashApi(config.unsplashAccessKey);

    const googleClient = new OAuth2Client(config.googleClientId, config.googleClientSecret, config.googleRedirectURI);
    const authLib = new AuthLib(googleClient);

    // TODO: May make these more configurable
    const openAiOptions = new OpenAiOptions(
        config.openAIApiKey,
        'https://api.openai.com/v1/chat/completions',
        'gpt-3.5-turbo',
        700,
        0.8
    );
    const llmApi = new OpenAiApi(openAiOptions);

    // TODO: This will eventually come from somewhere else
    const quizTopics = [
        'databases', 
        'health and nutrition', 
        'first aid',
        'dog training',
        
        'film structure',
        'film history',
        'film theory',

        'canadian history',
        'geography',
        'ancient history',
        'economics',
        'canadian politics',
        'political theory',

        'computer science',
        'software development',
        'software cybersecurity',
    ];

    const tipTopics = [
        ['health', 'wellness', 'fitness', 'nutrition', 'first aid', 'dog health'],
        ['technology', 'programming', 'c++', 'software architecture', 'cybersecurity'],
        ['productivity', 'time management', 'organization', 'random', 'life hacks'],
    ];

    const lib = new MainLib(
        new ComicLib(),
        new JokeLib(ninjaApi),
        new QuoteLib(ninjaApi),
        new RiddleLib(ninjaApi),
        new PoemLib(poemApi),
        new TropeLib(tropeApi),
        new FactLib(ninjaApi),
        new PictureLib(unsplashApi),
        new QuizLib(llmApi, quizTopics),
        new TipLib(llmApi, tipTopics)
    );

    const dbClient = new PrismaClient();
    const seeder = new Seeder(lib, initialCategories, dbClient);

    const services: Services = {
        fetchLib: new FetchLib(dbClient),
        categories: initialCategories,
        authLib: authLib,
        seeder: seeder,
    };
    
    return services;
};

export default setup;