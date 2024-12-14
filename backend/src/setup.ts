import CacheLib from "./cacheLib";
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

interface Services {
    cacheLib: CacheLib,
    categories: Category[],

};

function setup(config: Config): Services {
    const ninjaApi = new NinjaApi(config.ninjasApiKey);
    const poemApi = new PoemApi();
    const tropeApi = new TropeApi();
    const unsplashApi = new UnsplashApi(config.unsplashAccessKey);

    const lib = new MainLib(
        new ComicLib(),
        new JokeLib(ninjaApi),
        new QuoteLib(ninjaApi),
        new RiddleLib(ninjaApi),
        new PoemLib(poemApi),
        new TropeLib(tropeApi),
        new FactLib(ninjaApi),
        new PictureLib(unsplashApi),
    );

    const services: Services = {
        cacheLib: new CacheLib(lib),
        categories: initialCategories
        //...
    };
    
    return services;
};


export default setup;