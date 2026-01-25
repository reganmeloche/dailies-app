import Poem from '../classes/poem';
import { IPoemApi } from '../helpers/poemApi';

export interface IPoemLib {
    fetchPoem(): Promise<Poem | null>;
} 

class PoemLib implements IPoemLib {
    private api: IPoemApi;

    constructor(api: IPoemApi) {
        this.api = api;
    }
    public async fetchPoem(): Promise<Poem | null> {
        const result = await this.api.getDailyPoem();
        return result;
    }
}

export default PoemLib;