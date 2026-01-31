import Poem, { Stanza } from '../classes/poem';
import { IPoemApi } from '../helpers/poemApi';
import logger from '../utils/logger';

export interface IPoemLib {
    fetchPoem(): Promise<Poem | null>;
} 

class PoemLib implements IPoemLib {
    private _poemApi: IPoemApi;

    constructor(poemApi: IPoemApi) {
        this._poemApi = poemApi;
    }
    public async fetchPoem(): Promise<Poem | null> {
        const apiPoems = await this._poemApi.fetchRandomPoems(5);

        if (!apiPoems || apiPoems.length == 0) {
            logger.error("No poems were fetched");
            return null;
        }

        // Choose the poem with the lowest line count
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lowestIndex = apiPoems.reduce((res:number, curr:any, i:number) => {
            return Number(curr['linecount']) < Number(apiPoems[i]['linecount']) ? i : res;
          }, 0);

        const shortestPoem = apiPoems[lowestIndex];

        return new Poem(
            shortestPoem['author'],
            shortestPoem['title'],
            [
                new Stanza(shortestPoem['lines'])
            ]
        );
    }
}

export default PoemLib;