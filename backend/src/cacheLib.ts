import MainLib from './mainLib';
import { CategoryEnum } from './initialCategories';

type FetchFunction<T> = () => Promise<T>;

class CacheLib {
    private mainLib: MainLib;
    private cache: Map<string, { value: any; expiration: number }>;
    
    constructor(mainLib: MainLib) {
        this.mainLib = mainLib;
        this.cache = new Map();
    }

    private fetchFunctions: { [key in CategoryEnum]: FetchFunction<any> } = {
        [CategoryEnum.JOKE]: () => this.mainLib.getJoke(),
        [CategoryEnum.COMIC]: () => this.mainLib.getCalvinAndHobbes(),
        [CategoryEnum.FACT]: () => this.mainLib.getFact(),
        [CategoryEnum.QUOTE]: () => this.mainLib.getQuote(),

        [CategoryEnum.PICTURE]: () => this.mainLib.getFact(),
        [CategoryEnum.POEM]: () => this.mainLib.getCalvinAndHobbes(),
        [CategoryEnum.TROPE]: () => this.mainLib.getCalvinAndHobbes(),
        [CategoryEnum.RIDDLE]: () => this.mainLib.getCalvinAndHobbes(),
        [CategoryEnum.QUIZ]: () => this.mainLib.getCalvinAndHobbes(),
    };

    public async get<T>(category:CategoryEnum, getNew:boolean = false): Promise<T> {
        const cacheKey: string = category; 

        const result = this.tryGetCache<T>(cacheKey);

        if (getNew || result == null) {
            // fetch
            const result = await this.fetchFunctions[category]();

            // store
            const expirationTime = this.getEndofDay();
            this.cache.set(cacheKey, { value: result, expiration: expirationTime });
            
            return result;
        } else {
            return result;
        }
    }

    private getEndofDay(): number {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(23, 59, 59, 999); // Set time to the last millisecond of the current day
    
        // Return the expiration timestamp (in milliseconds)
        return midnight.getTime();
    }

    public tryGetCache<T>(cacheKey:string): T | null {
        const cached = this.cache.get(cacheKey);

        if (!cached) { return null; }

        // check if it has expired
        const currentTime = Date.now();
        if (currentTime > cached.expiration) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.value;
    }

}
  
export default CacheLib;
  