import CacheLib from "./cacheLib";
import ComicLib from "./comicLib";
import { initialCategories } from "./initialCategories";
import JokeLib from "./jokeLib";
import MainLib from "./mainLib";
import NinjaApi from "./ninjaApi";
import { Config } from './config';
import { Category } from "../../shared/classes/category";

interface Services {
    cacheLib: CacheLib,
    categories: Category[],

};

function setup(config: Config): Services {
    const ninjaApi = new NinjaApi(config.ninjasApiKey);

    const lib = new MainLib(
        new ComicLib(),
        new JokeLib(ninjaApi)
    );

    const services: Services = {
        cacheLib: new CacheLib(lib),
        categories: initialCategories
        //...
    };

    return services;
};


export default setup;