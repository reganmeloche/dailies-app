import CacheLib from "./cacheLib";
import ComicLib from "./comicLib";
import { initialCategories } from "./initialCategories";
import JokeLib from "./jokeLib";
import MainLib from "./mainLib";
import NinjaApi from "./ninjaApi";
import { Config } from './config';
import { Category } from "../../shared/classes/category";
import QuoteLib from "./quoteLib";
import RiddleLib from "./riddleLib";
import PoemLib from "./poemLib";
import PoemApi from "./poemApi";
import TropeLib from "./tropeLib";
import TropeApi from "./tropeApi";

interface Services {
    cacheLib: CacheLib,
    categories: Category[],

};

function setup(config: Config): Services {
    const ninjaApi = new NinjaApi(config.ninjasApiKey);
    const poemApi = new PoemApi();
    const tropeApi = new TropeApi();

    const lib = new MainLib(
        new ComicLib(),
        new JokeLib(ninjaApi),
        new QuoteLib(ninjaApi),
        new RiddleLib(ninjaApi),
        new PoemLib(poemApi),
        new TropeLib(tropeApi),

    );

    const services: Services = {
        cacheLib: new CacheLib(lib),
        categories: initialCategories
        //...
    };
    
    return services;
};


export default setup;