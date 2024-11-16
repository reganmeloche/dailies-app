import Poem from '../../shared/classes/poem';
import { IPoemApi } from './poemApi';

export interface IPoemLib {
    fetchPoem(): Promise<Poem>;
} 

class PoemLib implements IPoemLib {
    private api: IPoemApi;

    constructor(api: IPoemApi) {
        this.api = api;
    }
    public async fetchPoem(): Promise<Poem> {
        const result = await this.api.getDailyPoem();
        return result;
    }
}

export default PoemLib;