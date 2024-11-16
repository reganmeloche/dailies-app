import IMainLib, { CacheKey } from './interfaces/IMainLib';
import { CategoryEnum } from './initialCategories';

type FetchFunction<CacheKey> = () => Promise<CacheKey>;

class CacheLib {
    private mainLib: IMainLib;
    private cache: Map<string, { value: CacheKey; expiration: number }>;
    
    constructor(mainLib: IMainLib, initialCache: Map<string, { value: CacheKey; expiration: number }> = new Map()) {
        this.mainLib = mainLib;
        this.cache = initialCache;
    }

    private fetchFunctions: { [key in CategoryEnum]: FetchFunction<CacheKey> } = {
        [CategoryEnum.JOKE]: () => this.mainLib.getJoke(),
        [CategoryEnum.COMIC]: () => this.mainLib.getCalvinAndHobbes(),
        [CategoryEnum.FACT]: () => this.mainLib.getFact(),
        [CategoryEnum.QUOTE]: () => this.mainLib.getQuote(),
        [CategoryEnum.POEM]: () => this.mainLib.getPoem(),
        [CategoryEnum.RIDDLE]: () => this.mainLib.getRiddle(),

        [CategoryEnum.PICTURE]: () => this.mainLib.getFact(),
        [CategoryEnum.TROPE]: () => this.mainLib.getCalvinAndHobbes(),
        [CategoryEnum.QUIZ]: () => this.mainLib.getCalvinAndHobbes(),
    };

    public async get(category:CategoryEnum, getNew:boolean = false): Promise<CacheKey> {
        const cacheKey: string = category; 
        const cachedResult = this.tryGetCache(cacheKey);

        if (getNew || cachedResult == null) {
            const fetchedResult = await this.fetchFunctions[category]();
            const expirationTime = this.getEndofDay();
            this.cache.set(cacheKey, { value: fetchedResult, expiration: expirationTime });
            
            return fetchedResult;
        } else {
            return cachedResult;
        }
    }

    private getEndofDay(): number {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(23, 59, 59, 999); // Set time to the last millisecond of the current day
    
        // Return the expiration timestamp (in milliseconds)
        return midnight.getTime();
    }

    public tryGetCache(cacheKey:string): CacheKey | null {
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
  